import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBooking from "../../custom-hooks/useBooking";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const PersonalReservation = () => {
  const { booking } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const { getReservationInfo } = useBooking();

  const id = user?.id;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getReservationInfo(id);
  }, []);
  console.log(booking);
  const showReservations = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {open && (
        <Box>
          <Box
            onClick={showReservations}
            sx={{
              position: "absolute",
              top: "-20px",
              right: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid gray",
              borderRadius: "50%",
            }}
          >
          {booking?.length !== 0 &&  <CloseIcon
              sx={{ "&:hover": { color: "red", transition: "0.5s ease" } }}
            />}
          </Box>
          <Typography sx={{ textAlign: "center" }}>
            {booking[0]?.userId.username && "Dear"}
            {booking[0]?.userId.username}
          </Typography>
          {booking?.map((book) => (
            <Box key={book._id} sx={{ textAlign: "center", margin: "1rem" }}>
              <Typography>
                You made a reservation for a {book.roomId.bedType} room (
                {book.roomId.roomNumber}) from
                {new Date(book.arrival_date).toLocaleDateString()} to
                {new Date(book.departure_date).toLocaleDateString()}
              </Typography>
              <Typography>
                with total fee for {book.night}
                {book.night == 1 ? "night" : "nights"} is ${book.price}
              </Typography>
              <Typography>
                We are ready to serve you to make you have an enjoyable time in
                our Hotel
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Typography
        variant="h6"
        onClick={showReservations}
        sx={{
          cursor: "pointer",
          width: "270px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "color 0.3s",
          color: "inherit",
          "&:hover": {
            color: "red",
          },
          "&:hover .arrow-icon": {
            opacity: 1,
            transform: "translateX(5px)",
          },
        }}
      >
        {booking?.length > 0 ? "Check Your Reservations" : "There is no reservation"}
        <ArrowForwardIcon
          className="arrow-icon"
          sx={{
            display:`${booking?.length > 0 ? "inline-block" : "none"}`,
            marginLeft: "8px",
            opacity: 0,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        />
      </Typography>
    </Box>
  );
};

export default PersonalReservation;