import { Box, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearError } from "../../Features/authSlice";
import { clearBookingError } from "../../Features/bookingSlice";

const ErrorPage = () => {
  const { errorMessage, error: authError } = useSelector((state) => state.auth);
  const { bookingErrorMessage, error: bookingError } = useSelector(
    (state) => state.booking
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname);

  const path = location?.pathname.split("/")[1];

  useEffect(() => {
    let timer;

    if (authError) {
      if (errorMessage?.includes("duplicate") && errorMessage?.includes("username")) {
        setMessage("Username has already been taken");
      } else if (errorMessage?.includes("duplicate") && errorMessage?.includes("email")) {
        setMessage("Email has already been taken");
      } else if (errorMessage?.includes("check your username/email and password")) {
        setMessage("Credentials are incorrect. Please check your username/email and password.");
      } else {
        setMessage("An error occurred. Please wait for 3 seconds.");
      }

      timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    } else if (bookingError) {
      if (bookingErrorMessage?.includes("valid dates")) {
        setMessage("Please check your reservation dates.");
      } else if (bookingErrorMessage?.includes("not empty at the period of time")) {
        setMessage("The room is reserved during the selected period. Please change the date.");
      } else {
        setMessage("An error occurred with the booking. Please wait for 3 seconds.");
      }

      timer = setTimeout(() => {
        dispatch(clearBookingError());
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authError, bookingError, errorMessage, bookingErrorMessage]);

  console.log("error from auth : ", authError);
  // console.log("errorMessage from auth : ",errorMessage);
  // console.log(" from bookingError : ",);
  console.log("bookingError from bookingError : ", bookingError);

  return (
    <Box>
       {(authError || bookingError) && (
        <Stack>
          <Typography variant="h4" color="error">{message}</Typography>
          <Typography variant="h6">
            You will be redirected to the {path} page automatically in 3 seconds.
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ErrorPage;