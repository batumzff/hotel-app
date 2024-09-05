import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useRooms from "../../custom-hooks/useRooms";
import { Box, Stack, Typography } from "@mui/material";
import RoomCard from "../../components/ROOM-CARD/RoomCard";

const RoomDetail = () => {
  

  return <RoomCard />;
};

export default RoomDetail;