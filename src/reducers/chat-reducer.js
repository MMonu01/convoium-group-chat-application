import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  room_list: [],
  current_room: {}, // room_id,room_name
  message_list: [],
};

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState: INITIAL_STATE,
  reducers: {
    RESET_CHAT_DATA: (state) => {
      return INITIAL_STATE;
    },

    CHAT_SET_ROOMS_DATA: (state, { payload }) => {
      state.room_list = payload;

      return state;
    },

    CHAT_SET_NEW_ROOM: (state, { payload }) => {
      state.room_list = [...state.room_list, payload];

      return state;
    },

    CHAT_SET_MESSAGE_LIST: (state, { payload }) => {
      state.message_list = payload;

      return state;
    },

    SET_CURRENT_ROOM: (state, { payload }) => {
      state.current_room = payload;

      return state;
    },

    CHAT_SET_NEW_MESSAGE: (state, { payload }) => {
      const message_list = JSON.parse(JSON.stringify(state.message_list));

      const x = message_list.length - 1;
      if (message_list.length > 0 && message_list[x].user_email === payload.user_email) {
        message_list[x].messages = [...message_list[x].messages, { message: payload.message, date: payload.date }];
      } else {
        const message = { ...payload, messages: [{ message: [payload.message], date: payload.date }] };
        message_list.push(message);
      }
      state.message_list = message_list;

      return state;
    },
  },
});

export const { CHAT_SET_ROOMS_DATA, RESET_CHAT_DATA, SET_CURRENT_ROOM, CHAT_SET_CONNECTION_DATA, CHAT_SET_MESSAGE_LIST, CHAT_SET_NEW_MESSAGE, CHAT_SET_NEW_ROOM } = ChatSlice.actions;

export default ChatSlice.reducer;
