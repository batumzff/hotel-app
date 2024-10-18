import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useBooking from "../../custom-hooks/useBooking";
import { Box, Stack, Typography } from "@mui/material";
import Calendar from "../FORM-INPUTS/Calendar";
import MyButton from "../FORM-INPUTS/MyButton";
import useRooms from "../../custom-hooks/useRooms";
import ErrorModal from "../ERROR-MODAL/ErrorModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";



const Booking = () => {
  const { user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);
  const { rooms, roomDetail } = useSelector((state) => state.room);
  const { reservation } = useBooking();

  const { roomId } = useParams();

  const location = useLocation();

  console.log(location.pathname.split("/")[1]);
  const path = location.pathname.split("/")[1];

  // console.log(roomId);
  console.log(roomDetail);

  const { getRoomsInfo } = useRooms();
  const { getReservationInfo } = useBooking();
  const calendarRef = useRef();
  // const [selectedGuestNumber, setSelectedGuestNumber] = useState("");
  // const [filteredRooms, setFilteredRooms] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getRoomsInfo("roomDetail", roomId);
    getReservationInfo();
  }, []);

  const data = booking?.payload?.data;
  // console.log("booking: ", booking);
  // console.log("rooms: ", rooms);
  // console.log("user in booking: ", user);

  console.log(
    "calendarRef.current: ",
    calendarRef.current?.getSelectedDateRange().arrival_date
  );
  console.log(
    "calendarRef.current: ",
    calendarRef.current?.getSelectedDateRange().departure_date
  );

 
  const handleSubmit = () => {
    const selectedDateRange = calendarRef.current.getSelectedDateRange();
    const arrival = selectedDateRange.arrival_date
    const departure = selectedDateRange.departure_date
    const totalDays = new Date( departure - arrival) / (1000 * 60 * 60 * 24)
    const totalPrice = totalDays * roomDetail?.price
    const postData = {
      arrival_date: arrival,
      departure_date: departure,
      username: user?.username,
      roomNumber: roomDetail?.roomNumber,
      // price:roomDetail?.price
      price: totalPrice ,
      // guest_number: selectedGuestNumber,
    };
    console.log("postData: ", postData);
    reservation(postData);
    navigate("/payment", {
      state: {
        from: path,
        data: {
          total: totalPrice,
        },
      },
    });
  };

  return (
    <Box
      sx={{
        marginTop: "2rem",
        padding: ".3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* <ErrorPage/> */}
      <ErrorModal />
      <Typography variant="h4">Let's find a Reservation for you </Typography>
      <Stack
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <Calendar ref={calendarRef} />
        <Stack
          sx={{ flexDirection: "column", gap: "1rem", margin: ".5rem auto" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <MyButton
              onClick={handleSubmit}
              // disabled={filteredRooms.length === 0}
            >
              Make a reservation
            </MyButton>
          </Box>
        </Stack>
      </Stack>
      {data &&
        new Date(data["arrival_date"]).toLocaleDateString("en-US") !==
          "Invalid Date" && (
          <Box>
            <Stack>
              Dear {user?.username}, for your request there has been made a
              reservation for the dates between
              <Typography>
                {new Date(data["arrival_date"]).toLocaleDateString("en-US")}
              </Typography>
              <Typography>
                {new Date(data["departure_date"]).toLocaleDateString("en-US")}
              </Typography>
              for <Typography>{data.night}</Typography> night with the total
              amount of <Typography>{data.totalPrice}</Typography>
            </Stack>
          </Box>
        )}
    </Box>
  );
};

export default Booking;