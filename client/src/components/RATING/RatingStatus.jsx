import React, { useState } from "react";
import useRooms from "../../custom-hooks/useRooms";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export default function RatingStatus({ roomRating, readOnlyStatus, roomId }) {
  const { user } = useSelector(state => state.auth)
  const { roomDetail } = useSelector(state => state.room)
    const { updateRooms } = useRooms()
  const [ratings, setRatings] = useState(0);
  // console.log("rating component: ", roomRating);
  // console.log("rating component: ", roomsRatings);
  console.log("rating component rooms: ", roomDetail);
  console.log("rating component rooms: ", roomId);
console.log(user);
const handleRating = (e, newValue) => {

  const ratingValue = Number(newValue);

  const newRating = {
    value: ratingValue,
    userId: user?.id, 
  };

  setRatings(ratingValue);

  updateRooms("rooms", roomId, { ratings: newRating });
};

  return (
    <Stack spacing={1}>
      {roomId && user ? (
        <Rating  name="simple-controlled" value={roomRating} onChange={handleRating}
        
        />
      ) : (
        <Rating
          name="read-only"
          value={readOnlyStatus}
          readOnly
        />
      )}
    </Stack>
  );
}