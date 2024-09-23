import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useBooking from "../../custom-hooks/useBooking";
import { Box, Stack, Typography } from "@mui/material";
import Calendar from "../../components/FORM-INPUTS/Calendar";
import MyButton from "../../components/FORM-INPUTS/MyButton";
import SelectOption from "../../components/FORM-INPUTS/SelectOption";
import useRooms from "../../custom-hooks/useRooms";
import ErrorPage from "../../components/ERROR-PAGE/ErrorPage";
import ErrorModal from "../../components/ERROR-MODAL/ErrorModal";
import { useNavigate, useParams } from "react-router-dom";

// const guestNumber = [];
// for (let i in [...Array(10)]) {
//   i !== "0" && guestNumber.push(Number(i));
// }

const Booking = () => {
  const { user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);
  const { rooms, roomDetail } = useSelector((state) => state.room);
  const { reservation } = useBooking();

  const { roomId } = useParams()

  // console.log(roomId);
  console.log(roomDetail);

  const { getRoomsInfo } = useRooms();
  const { getReservationInfo } = useBooking();
  const calendarRef = useRef();
  // const [selectedGuestNumber, setSelectedGuestNumber] = useState("");
  // const [filteredRooms, setFilteredRooms] = useState([]);

  const navigate = useNavigate();

  // const handleGuestNumberChange = (selectedGuests) => {
  //   setSelectedGuestNumber(selectedGuests);

  //   const availableRooms = rooms.filter((room) => {
  //     switch (true) {
  //       case selectedGuests === 1:
  //         return room.bedType === "single";
  //       case selectedGuests === 2:
  //         return room.bedType === "double";
  //       case selectedGuests > 2 && selectedGuests <= 4:
  //         return room.bedType === "family";
  //       case selectedGuests >= 5:
  //         return room.bedType === "king";
  //       default:
  //         return false;
  //     }
  //   });
  //   setFilteredRooms(availableRooms);
  // };

  useEffect(() => {
    getRoomsInfo("roomDetail", roomId);
    getReservationInfo();
  }, []);

  const data = booking?.payload?.data;
  // console.log("booking: ", booking);
  // console.log("rooms: ", rooms);
  // console.log("user in booking: ", user);

  const handleSubmit = () => {
    const selectedDateRange = calendarRef.current.getSelectedDateRange();
    const postData = {
      arrival_date: selectedDateRange.arrival_date,
      departure_date: selectedDateRange.departure_date,
      username: user?.username,
      roomNumber:roomDetail?.roomNumber,
      price:roomDetail?.price
      // guest_number: selectedGuestNumber,
    };
    console.log("postData: ", postData);
    reservation(postData);
    navigate("/booking/payment");
  };
  // console.log("calendarRef.current: ",calendarRef.current.getSelectedDateRange().arrival_date);
  // console.log("calendarRef.current: ",calendarRef.current.getSelectedDateRange().departure_date);
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
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
              },
              gap: ".4rem",
            }}
          >
            <SelectOption label="Guests" guests={guestNumber} ref={guestNumberRef} />
          <SelectOption label="Rooms" rooms={rooms} ref={guestRef} />
            <SelectOption
              label="Guests"
              guests={guestNumber}
              onChange={handleGuestNumberChange}
            />

            <SelectOption
              label="Rooms"
              rooms={filteredRooms}
              disabled={filteredRooms.length === 0} // Disable if no rooms match
            />
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap:"1rem"
            }}
          >
            <MyButton
              onClick={handleSubmit}
              // disabled={filteredRooms.length === 0}
            >
              Make a reservation
            </MyButton>
            {/* <MyButton disabled={filteredRooms.length === 0}>
              New reservation
            </MyButton> */}
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