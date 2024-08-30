import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    booking:[],
    loading: false,
    error: false
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
                state.booking = {
                    ...state.booking, payload
                }
            },

            fetchFail:(state) => {
                state.loading = false
                state.error = true
            },
    }
})

export const { fetchStart, getReservation, fetchFail } = bookingSlice.actions

export default bookingSlice.reducer