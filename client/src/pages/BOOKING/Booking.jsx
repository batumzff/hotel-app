import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useBooking from "../../custom-hooks/useBooking";
import { Box, Stack, Typography } from "@mui/material";
import Calendar from "../../components/FORM-INPUTS/Calendar";
import MyButton from "../../components/FORM-INPUTS/MyButton"
import SelectOption from "../../components/FORM-INPUTS/SelectOption";
import useRooms from "../../custom-hooks/useRooms";

const Booking = () => {
  const { user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);
  const { rooms } = useSelector((state) => state.room);
  const { reservation } = useBooking();

  const { getRoomsInfo } = useRooms()
  const calendarRef = useRef()
  const guestRef = useRef()

  useEffect(() => {
   getRoomsInfo()
  }, [])
  

  const data = booking?.payload?.data;
  console.log("booking: ", booking);
  console.log("rooms: ", rooms);
  console.log("user in booking: ", user);
 

  // const [selectedDateRange, setSelectedDateRange] = useState({
  //   arrival_date: "",
  //   departure_date: "",
  //   guest_number: "",
  // });

  // const handleDateChange = (range) => {
  //   setSelectedDateRange({
  //     arrival_date: range.startDate,
  //     departure_date: range.endDate
  //   });
  // };

  const handleSubmit = () => {
    const selectedDateRange = calendarRef.current.getSelectedDateRange();
    console.log('Selected Date Range:', selectedDateRange);
    const bedType = guestRef.current.getBedType()
    console.log('bedType:', bedType)
    let guest_number;
    switch (bedType) {
      case "single":
        guest_number=1
        break;
      case "double":
        guest_number=2
        break;
      case "family":
        guest_number= 4
        break;
      case "king":
        guest_number= 6 
        break;
    
      default:
        guest_number=1
        break;
    }
    const postData = {
      arrival_date:selectedDateRange.arrival_date,
      departure_date:selectedDateRange.departure_date,
      username: user?.username,
      guest_number
    }
    console.log("postData: ",postData);
    reservation(postData);
  };
  return (
    <Box sx={{marginTop:"1rem"}}>
      <Stack sx={{justifyContent: "center", alignItems: "center", gap:"1rem"}}>
        <Typography variant="h4">Let's find a Reservation for you </Typography>
        {/* <Calendar onDateChange={handleDateChange} /> */}
        <Calendar ref={calendarRef}/>
        <SelectOption label="Rooms" rooms={rooms} ref={guestRef}/>
        <MyButton onClick={handleSubmit}>Make a reservation</MyButton>
        <MyButton>New reservation</MyButton>
      </Stack>
      {data && (
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