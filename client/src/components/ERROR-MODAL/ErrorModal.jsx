import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyButton from "../FORM-INPUTS/MyButton";
import Calendar from "../../components/FORM-INPUTS/Calendar";
import { useSelector, useDispatch } from "react-redux";
import useBooking from "../../custom-hooks/useBooking";
import useRooms from "../../custom-hooks/useRooms";
import SelectOption from "../FORM-INPUTS/SelectOption";
import { useLocation } from "react-router-dom";
import { clearError } from "../../Features/authSlice";
import { clearBookingError } from "../../Features/bookingSlice";

const style = {
  width: "80%",
  height: "400px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  margin: "5rem auto",
  p: 4,
};

export default function ErrorModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      if (
        errorMessage?.includes("duplicate") &&
        errorMessage?.includes("username")
      ) {
        setMessage("Username has already been taken");
      } else if (
        errorMessage?.includes("duplicate") &&
        errorMessage?.includes("email")
      ) {
        setMessage("Email has already been taken");
      } else if (
        errorMessage?.includes("check your username,email and password")
      ) {
        setMessage(
          "Credentials are incorrect. Please check your username,email and password."
        );
      } else {
        setMessage("An error occurred. Please wait for 3 seconds.");
      }

      timer = setTimeout(() => {
        dispatch(clearError());
        setOpen(false);
      }, 3000);
      setOpen(true)
    } else if (bookingError) {
      if (bookingErrorMessage?.includes("valid dates")) {
        setMessage("Please check your reservation dates.");
      } else if (
        bookingErrorMessage?.includes("not empty at the period of time")
      ) {
        setMessage(
          "The room is reserved during the selected period. Please change the date."
        );
      } else {
        setMessage(
          "An error occurred with the booking. Please wait for 3 seconds."
        );
      }

      timer = setTimeout(() => {
        dispatch(clearBookingError());
        setOpen(false)
      }, 3000);
      setOpen(true)
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authError, bookingError, errorMessage, bookingErrorMessage]);
  return (
    <section
      style={{
        // width: "30rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {(authError || bookingError) && (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          // aria-labelledby="keep-mounted-modal-title"
          // aria-describedby="keep-mounted-modal-description"
        >
          <Box>
            <Stack>
              <Typography variant="h4" color="error">
                {message}
              </Typography>
              <Typography variant="h6">
                You will be redirected to the {path} page automatically in 3
                seconds.
              </Typography>
            </Stack>
          </Box>
        </Modal>
      )}
    </section>
  );
}