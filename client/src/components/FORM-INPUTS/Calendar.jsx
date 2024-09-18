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

import React, { useState, forwardRef, useImperativeHandle } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Calendar = forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(7, 'day'));

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
console.log(startDate)
console.log(endDate)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "500px", // Adjust the max width as needed
          margin: "0 auto", // Center horizontally
        }}
      >
        <Stack spacing={2}>
          <DatePicker
            label="Arrival Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="Departure Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
});

export default Calendar;
