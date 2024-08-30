import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getRooms } from "../Features/roomSlice"

const useRooms = () => {
const { axiosPublic } = useAxios()
const dispatch = useDispatch()


const getRoomsInfo = async () => {
    dispatch(fetchStart())
    try {
       const { data } = await axiosPublic("rooms") 
       dispatch(getRooms(data))
    } catch (error) {
        dispatch(fetchFail())
        console.error(error);
    }
    
}

  return { getRoomsInfo }
}

export default useRooms