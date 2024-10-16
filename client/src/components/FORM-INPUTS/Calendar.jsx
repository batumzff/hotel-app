// import React, { useState, forwardRef, useImperativeHandle } from "react";
// import dayjs from "dayjs";
// import { DateRangePicker } from "react-date-range";
// import { addDays } from "date-fns";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const Calendar = forwardRef((props, ref) => {
//   const [range, setRange] = useState([
//     {
//       // arrival_date: dayjs().toDate(),
//       startDate: dayjs().toDate(),
//       endDate: dayjs().toDate(),
//       // departure_date: addDays(new Date(), 7), // Default end date 7 days after the start date
//       key: "selection",
//     },
//   ]);

//   const handleSelect = (e) => {
//     setRange([e.selection]);
//     // onDateChange(item.selection);
//   };

//   useImperativeHandle(ref, () => ({
//     getSelectedDateRange: () => ({
//       arrival_date: range[0].startDate,
//       departure_date: range[0].endDate,
//     }),
//   }));

//   console.log("date range in booking: ", range);
//   // console.log(AdapterDayjs)
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DatePicker"]}>
//         <DemoItem label="Arrival Date">
//           <DatePicker defaultValue={dayjs()} onClick={handleSelect}  />
//         </DemoItem>
//         <DemoItem label="Departure Date">
//           <DatePicker defaultValue={dayjs()} onClick={handleSelect} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// });

// export default Calendar;

import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import useAxios from "../../custom-hooks/useAxios";

const Calendar = forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(7, 'day'));
  const [reservedDates, setReservedDates] = useState([])
  const { roomId } = useParams()
  const { axiosWithToken } = useAxios();


  console.log(roomId);

  const getRoomReservationInfo = async () => {
    try {
      const { data } = await axiosWithToken(
        `reservations?filter[roomId]=${roomId}`
      );
      console.log(data);
      setReservedDates(data?.data)
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(reservedDates);
 

  useEffect(() => {
    getRoomReservationInfo();

  }, [roomId])
  

  useImperativeHandle(ref, () => ({
    getSelectedDateRange: () => ({
      arrival_date: startDate.toDate(),
      departure_date: endDate.toDate(),
    }),
  }));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
// console.log(startDate)
// console.log(endDate)


const isDateReserved = (date) => {
  return reservedDates.some(reservation => {
    const arrival = dayjs(reservation["arrival_date"])
    const departure = dayjs(reservation["departure_date"])
    return date.isBetween(arrival, departure, "day", "[]")
  }) 
}
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "500px", 
          margin: "1rem auto",
        }}
      >
        <Stack spacing={2}>
          <DatePicker
            label="Arrival Date"
            value={startDate}
            onChange={handleStartDateChange}
            shouldDisableDate={isDateReserved}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="Departure Date"
            value={endDate}
            onChange={handleEndDateChange}
            shouldDisableDate={isDateReserved}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
});

export default Calendar;