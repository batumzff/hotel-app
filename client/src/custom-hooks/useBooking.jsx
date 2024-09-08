import React from 'react'
import useAxios from './useAxios'
import { fetchFail, fetchStart, getReservation } from '../Features/bookingSlice'
import { useDispatch } from 'react-redux'

const useBooking = () => {
    const { axiosPublic, axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const reservation = async (reservationInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post("reservations", reservationInfo)
            console.log(data);
            dispatch(getReservation(data))
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error);
        }
      
    }

    const getReservationInfo = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken("reservations")
            console.log(data);
            dispatch(getReservation(data))
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error);
        }
    }

  return { reservation, getReservationInfo }
}

export default useBooking