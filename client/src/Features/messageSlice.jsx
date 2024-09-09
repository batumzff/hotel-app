import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message:[],
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
        state.message = payload?.data?.data
        state.loading = false
        state.error = false
    },

    fetchFail: (state) => {
        state.loading = false
        state.error = true
    }
  }
});

export const { fetchStart, fetchFail, getMessages } = messageSlice.actions

export default messageSlice.reducer