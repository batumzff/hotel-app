import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message:[],
  read: null,
  unread: null,
  loading: false,
  error: false
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchStart:(state) => {
        state.loading = true
        state.error = false
    },

   getMessages: (state, { payload }) => {
        state.message = payload?.data
        state.loading = false
        state.error = false
        console.log("getMessages in message slice",payload);
    },

   getMessageStatus: (state, { payload }) => {
        state[payload.url] = payload?.data?.data
        state.loading = false
        state.error = false
        console.log("getMessageStatus in message slice",payload);
    },

    fetchFail: (state) => {
        state.loading = false
        state.error = true
    }
  }
});

export const { fetchStart, fetchFail, getMessages, getMessageStatus } = messageSlice.actions

export default messageSlice.reducer