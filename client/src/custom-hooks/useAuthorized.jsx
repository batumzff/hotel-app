import React from "react";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getData } from "../Features/authorizedSlice";

const useAuthorized = () => {
  const { axiosPublic, axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getAuthorizedData = async () => {
    dispatch(fetchStart());
    try {
      const [clients, messages, reservations] = await Promise.all([
        axiosWithToken("users"),
        axiosWithToken("messages"),
        axiosWithToken("reservations"),
      ]);
      console.log(clients);
      console.log(messages);
      console.log(reservations);
      dispatch(
        getData([
          clients?.data?.data,
          messages?.data?.data,
          reservations?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail(error));
      console.error(error);
    }
  };
  return { getAuthorizedData };
};

export default useAuthorized;