import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  socket_id: null,
  socket_list: [],
  online_users: [],
};

export const ChatSlice = createSlice({
  name: "SocketSlice",
  initialState,
  reducers: {
    SOCKET_SET_CONNECTION_DATA: (state, { payload }) => {
      state.socket = payload.socket;
      state.socket_id = payload.socket_id;

      return state;
    },

    RESET_SOCKET: (state) => {
      return initialState;
    },

    SOCKET_SET_LIVE_USER: (state, { payload }) => {
      state.online_users = payload;

      return state;
    },
  },
});

export const { SOCKET_SET_CONNECTION_DATA, RESET_SOCKET, SOCKET_SET_LIVE_USER } = ChatSlice.actions;

export default ChatSlice.reducer;
