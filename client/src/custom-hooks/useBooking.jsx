import React from 'react'
import useAxios from './useAxios'
import { fetchFail, fetchStart, getReservation } from '../Features/bookingSlice'
import { useDispatch } from 'react-redux'

const useBooking = () => {
    const { axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const reservation = async (reservationInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post("reservations", reservationInfo)
            console.log(data);
            dispatch(getReservation(data))
        } catch (error) {
            dispatch(fetchFail())
            console.error(error);
        }
      
    }

  return { reservation }
}

export default useBooking