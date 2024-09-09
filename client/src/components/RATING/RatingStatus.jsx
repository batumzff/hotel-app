import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function RatingStatus({ roomId, readOnlyStatus }) {
  const [value, setValue] = React.useState(2);
  const { roomDetail } = useSelector((state) => state.room);

  console.log("rating", roomDetail);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      {roomId ? (
        <Rating
          name="simple-controlled"
          value={roomDetail?.averageRating}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      ) : (
        <Rating name="read-only" value={readOnlyStatus} readOnly />
      )}
    </Box>
  );
}
