import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getRooms } from "../Features/roomSlice";

const useRooms = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();

  const getRoomsInfo = async (address="rooms",id = "") => {
    dispatch(fetchStart());
    try {
      let url = "rooms";

      if (id) {
        url = `rooms/${id}`;
      }

      const { data } = await axiosPublic(url);
      console.log("get Rooms : ", data);

      dispatch(getRooms({address,data}));
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };

  return { getRoomsInfo };
};

export default useRooms;