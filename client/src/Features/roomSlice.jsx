import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms:[],
  roomDetail:{},
  loading: false,
  error: false
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    fetchStart:(state) => {
        state.loading = true
        state.error = false
    },

   getRooms: (state, { payload }) => {
        state[payload.address] = payload?.data?.data
        state.loading = false
        state.error = false
    },

    fetchFail: (state) => {
        state.loading = false
        state.error = true
    }
  }
});

export const { fetchStart, fetchFail, getRooms } = roomSlice.actions

export default roomSlice.reducer