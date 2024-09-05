import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useRooms from "../../custom-hooks/useRooms";
import { Box } from "@mui/material";
import MyButton from "../FORM-INPUTS/MyButton";
import logo from "../../assets/images/logo.png";

const RoomCard = ({ detail }) => {
  const { roomId } = useParams();

  console.log(detail);
  const { rooms, roomDetail } = useSelector((state) => state.room);
  const { getRoomsInfo } = useRooms();

  const navigate = useNavigate();

  console.log(roomDetail);
  console.log(roomId);
  console.log(rooms);

  const handleNavigate = (id) => {
    navigate(`/room-detail/${id}`);
  };

  useEffect(() => {
    roomId ? getRoomsInfo("roomDetail", roomId) : getRoomsInfo();
  }, [roomId]);

  return (
    <Box>
      {roomId ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ backgroundColor: "navy" }}
                aria-label={roomDetail?.title}
              >
                <img src={logo} alt={roomDetail?.roomNumber} width={50} />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={roomDetail?.roomNumber}
            subheader={new Date(roomDetail?.createdAt).toLocaleDateString()}
          />
          <CardMedia
            component="img"
            height="194"
            image={roomDetail?.image}
            alt={roomDetail?.bedType}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {roomDetail?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ) : (
        rooms.map((room) => (
          <>
            <Card sx={{ maxWidth: 345 }}>
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
                subheader={room.createdAt}
              />
              <CardMedia
                component="img"
                height="194"
                image={room.image[0]}
                alt={room.roomNumber}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {room.description}
                </Typography>
              </CardContent>
              <CardActions sx={{display:"flex",justifyContent:"space-around"}}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <MyButton onClick={()=>handleNavigate(room._id)}>
                  Detail
                </MyButton>
              </CardActions>
            </Card>
          </>
        ))
      )}
    </Box>
  );
};

export default RoomCard;