import { io } from "socket.io-client";
import { SocketApiUrl } from "~/env";

import { GetMessageData } from "~/actions/chat-actions";

import { LOGOUT } from "~/reducers/login-reducer";
import { SOCKET_SET_CONNECTION_DATA, RESET_SOCKET, SOCKET_SET_LIVE_USER } from "~/reducers/socket-reducer";
import { CHAT_SET_NEW_MESSAGE } from "~/reducers/chat-reducer";

export const StartSocketConnection = () => (dispatch, getState) => {
  const socket = io(SocketApiUrl);

  socket.on("connect", () => {
    console.log("socket connected", socket.id);
    dispatch(SOCKET_SET_CONNECTION_DATA({ socket, socket_id: socket.id }));
  });

  socket.on("connect_error", (error) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      // the connection was denied by the server
      // in that case, `socket.connect()` must be manually called in order to reconnect
      socket.connect();
    }
  });

  socket.on("online", (online_users) => {
    dispatch(SOCKET_SET_LIVE_USER(online_users));
  });

  socket.on("disconnect", (reason) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      socket.connect();
    }
  });

  socket.on("newMessage", (new_message) => {
    dispatch(CHAT_SET_NEW_MESSAGE(new_message));
  });
};

export const DisconnectSocket = () => (dispatch, getState) => {
  const { socket_store, login_store } = getState();
  const { socket } = socket_store;
  const { room } = login_store;

  socket.emit("leaveRoom", room);
  dispatch(RESET_SOCKET());
  dispatch(LOGOUT());
};

export const SocketJoinRoom = () => (dispatch, getState) => {
  const { chat_store, login_store, socket_store } = getState();
  const { current_room } = chat_store;
  const { username, user_id, avatar } = login_store;
  const { socket } = socket_store;

  if (Object.keys(current_room).length > 0) {
    socket.emit("join", { room_id: current_room.room_id, username, user_id, avatar });
    dispatch(GetMessageData(current_room.room_id));
  }
};

export const ChatSendNewMessages = (message) => (dispatch, getState) => {
  const { socket_store, chat_store, login_store } = getState();
  const { socket } = socket_store;
  const room_id = chat_store.current_room.room_id;
  const { user_id } = login_store;

  socket.emit("newMessage", { message, room_id, user_id });
};
