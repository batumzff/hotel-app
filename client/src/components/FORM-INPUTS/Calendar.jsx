import React, { useState, forwardRef, useImperativeHandle } from "react";
import dayjs from "dayjs";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // Main css file
import 'react-date-range/dist/theme/default.css'; // Theme css file
import  Box  from "@mui/material/Box";

const Calendar = forwardRef((props, ref) => {
  const [range, setRange] = useState([
    {
      // arrival_date: dayjs().toDate(),
      startDate: dayjs().toDate(),
      endDate: addDays(dayjs().toDate(), 7), 
      // departure_date: addDays(new Date(), 7), // Default end date 7 days after the start date
      key: 'selection'
    }
  ]);

  const handleSelect = (item) => {
    setRange([item.selection]);
    // onDateChange(item.selection);
  };

  useImperativeHandle(ref, () => ({
    getSelectedDateRange: () => ({
      arrival_date: range[0].startDate,
      departure_date: range[0].endDate,
    }),
  }));

  console.log("date range in booking: ", range);
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems: "center", border:"2px solid gray", borderRadius:".5rem", padding:".5rem"}}>
      <DateRangePicker
        ranges={range}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
      />
    </Box>
  );
});

export default Calendar;
