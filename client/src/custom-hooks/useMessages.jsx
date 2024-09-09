import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getMessages } from "../Features/messageSlice";

const useMessages = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getMessageInfo = async (id = "") => {
    dispatch(fetchStart());
    try {
      let url = "messages";

      if (id) {
        url = `messages/${id}`;
      }

      const { data } = await axiosWithToken(url);
      console.log("get Messages : ", data);

      dispatch(getMessages(data));
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };

  return { getMessageInfo };
};

export default useMessages;