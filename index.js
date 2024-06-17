import fs from "fs";
import express from "express";
import { createServer } from "http";
import session from "express-session";
import mongoStore from "connect-mongo";
import "dotenv/config";

import passport from "./server/services/passport.js";

import { ViewsRouter } from "./server/views.js";
import { userRouter } from "./server/routes/user-router.js";

import { Connection } from "./server/config/db.js";

const PORT = process.env.PORT || 9050;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.mongoURL,
      ttl: 7 * 24 * 60 * 60 * 1000,
    }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false },
  })
);

app.use(passport.session());

app.use("/user", userRouter);

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("./dist"));
}

app.get("*", ViewsRouter, async (req, res, next) => {
  try {
    const url = req.originalUrl;

    let template_html;
    if (!isProduction) {
      template_html = await fs.readFileSync("./index.html", "utf-8");
      template_html = await vite.transformIndexHtml(url, template_html);
    } else {
      template_html = await fs.readFileSync("./dist/index.html", "utf-8");
    }

    template_html = template_html.replace("__TITLE__", req.meta_title);
    res.status(200).send(template_html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

Connection.then(() => {
  console.log("connection to db successfull");
  httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}).catch((err) => {
  console.log("failed to connect to db", err);
});
