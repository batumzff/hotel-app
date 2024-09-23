import  React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useRooms from "../../custom-hooks/useRooms";


export default function RatingStatus({ roomId, readOnlyStatus }) {
  const [ratings, setRatings] = useState(0);
  const { roomDetail } = useSelector((state) => state.room);
  const { user } = useSelector(state => state.auth)
  const { updateRooms } = useRooms()
  console.log(user)
  const handleRating = (e, newValue) => {

    const ratingValue = Number(newValue);
  
    const newRating = {
      value: ratingValue,
      userId: user?.id, 
    };
  console.log(newRating)
  
    setRatings(ratingValue);
  
    updateRooms("rooms", roomId, { ratings: newRating });
  };

  


  // console.log("rating", roomDetail);
  // console.log(value)

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      {roomId && user ? (
        <Rating
          name="simple-controlled"
          value={ratings}
          onChange={handleRating}
          
        />
      ) : (
        <Rating name="read-only" value={readOnlyStatus} readOnly   />
      )}
    </Box>
  );
}
