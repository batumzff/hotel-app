import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    booking:[],
    loading: false,
    error: false,
    errorBookingMessage:""
}

export const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers: {
            fetchStart:(state) => {
                state.loading = true
                state.error = false
            },

            getReservation: ( state, { payload }) => {
                state.loading = false
                state.error = false
                state.booking = payload?.data
            },

            fetchFail:(state, { payload }) => {
                state.loading = false
                state.error = true,
                state.errorBooking = payload?.response?.data?.message
            },
            clearBookingError: (state) => {
                state.error = false;
              },
    }
})

export const { fetchStart, getReservation, fetchFail, clearBookingError } = bookingSlice.actions

export default bookingSlice.reducer