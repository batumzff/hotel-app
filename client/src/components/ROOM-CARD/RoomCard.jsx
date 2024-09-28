import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useRooms from "../../custom-hooks/useRooms";
import { Box, Stack } from "@mui/material";
import MyButton from "../FORM-INPUTS/MyButton";
import Grid from "@mui/material/Grid2"; 
import RatingStatus from "../RATING/RatingStatus";
import Booking from "../../pages/BOOKING/Booking";

const RoomCard = () => {
  const { roomId } = useParams();

  const { rooms, roomDetail } = useSelector((state) => state.room);
  const { getRoomsInfo } = useRooms();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/room-detail/${id}`);
  };

  useEffect(() => {
    roomId ? getRoomsInfo("roomDetail", roomId) : getRoomsInfo();
  }, [roomId]);

  // console.log(roomId);
  // console.log(roomDetail);

  return (
    <Grid container spacing={4} sx={{ placeContent: "center" }}>
      {roomId ? (
        <Box
          sx={{
            display: "flex",
            flexDirection:{ xs:"column-reverse", sm:"column-reverse", md:"row-reverse", lg:"row-reverse", xl:"row-reverse"},
            justifyContent: "space-between",
            gap: "2rem",
            backgroundColor: "rgba(255,255,255,0.3)",
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "25px",
            
          }}
        >
          <Booking />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack sx={{ flexDirection: "row", gap: ".5rem" }}>
                <Typography sx={{fontWeight:"900"}}>{roomDetail?.roomNumber}</Typography>
                <Typography sx={{fontWeight:"900"}}>{roomDetail?.bedType}</Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Typography sx={{ textAlign: "left", fontWeight:"700" }}>
                  Please rate this room.
                </Typography>
                <RatingStatus roomId={roomId} />
              </Stack>
            </Box>
            <Box>
              <img
                src={Array.isArray(roomDetail?.image) && roomDetail?.image[0]}
                alt={roomDetail?.roomNumber}
                style={{ borderRadius: "25px", width:"100%" }}
              />
              <Typography sx={{fontWeight:"700"}}>{roomDetail?.description}</Typography>
              <Typography  sx={{fontWeight:"700"}}>Per night: ${roomDetail?.price}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room._id}>
            <Card sx={{  mt:"1rem" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
                    {room.roomNumber}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={room.bedType}
                subheader={new Date(room.createdAt).toLocaleDateString()}
              />
              <CardMedia
                component="img"
                height="194"
                image={room.image[0]}
                alt={room.roomNumber}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    width: "25rem",
                    color: "text.secondary",
                    webkitBoxOrient: "vertical",
                    webkitLineClamp: "3",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    lineHeight: "1.5rem",
                    height: "calc(1.5rem * 3)",
                  }}
                >
                  {room.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <RatingStatus readOnlyStatus={room.averageRating} />
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <MyButton onClick={() => handleNavigate(room._id)}>
                  Detail
                </MyButton>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RoomCard;