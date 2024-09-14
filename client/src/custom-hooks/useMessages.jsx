import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getMessages, getMessageStatus } from "../Features/messageSlice";

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
      await readUnreadInfo()
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  };

  const readUnreadInfo = async (url="unread") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`messages/${url}`)
      dispatch(getMessageStatus({url, data}))
      console.log("read unread:", data);
    } catch (error) {
      dispatch(fetchFail());
      console.error(error);
    }
  }

  return { getMessageInfo, readUnreadInfo };
};

export default useMessages;