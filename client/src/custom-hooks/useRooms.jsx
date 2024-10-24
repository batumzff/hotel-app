import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getRooms } from "../Features/roomSlice";

const useRooms = () => {
  const { axiosPublic, axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getRoomsInfo = async (address="rooms",id = "") => {
    dispatch(fetchStart());
    try {
      let url = "rooms";

      if (id) {
        url = `rooms/${id}`;
      }

      const { data } = await axiosPublic(url);
      // console.log("get Rooms : ", data);

      dispatch(getRooms({address,data}));
    } catch (error) {
      dispatch(fetchFail());
      // console.error(error);
    }
  };

  const postRooms = async (url="rooms",id , info) => {
    // console.log("id in postRooms", id);
    // console.log("info in postRooms", info);
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`rooms/${id}`,info);
      // console.log("post Rooms : ", data);

      dispatch(getRooms({url,data}));
    } catch (error) {
      dispatch(fetchFail());
      // console.error(error);
    }
  };

  const updateRooms = async (url="rooms",id , info) => {
    // console.log("id in updateRooms", id);
    // console.log("info in updateRooms", info);
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`rooms/${id}`,info);
      // console.log("updateRooms  : ", data);

      dispatch(getRooms({url,data}));
    } catch (error) {
      dispatch(fetchFail());
      // console.error(error);
    }
  };

  return { getRoomsInfo, postRooms, updateRooms };
};

export default useRooms;