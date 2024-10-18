import { createSlice } from '@reduxjs/toolkit'

const initialState = {
clients:[],
messages: [],
reservations: [],
loading: false,
error: false
}

const authorizedSlice = createSlice({
  name: "authorized",
  initialState,
  reducers: {
    fetchStart:(state) => {
        state.loading = true
        state.error = false
    },

   getData: (state, { payload }) => {
        state.clients = payload[0]
        state.messages = payload[1]
        state.reservations = payload[2]
        state.loading = false
        state.error = false
    },

    fetchFail: (state) => {
        state.loading = false
        state.error = true
    }
  }
});

export const { fetchStart, getData, fetchFail } = authorizedSlice.actions

export default authorizedSlice.reducer