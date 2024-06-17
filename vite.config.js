import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import vercel from 'vite-plugin-vercel';
// import commonjs from 'vite-plugin-commonjs'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
});
