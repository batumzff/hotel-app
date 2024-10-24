import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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
import Grid from "@mui/material/Grid2"; // Import Grid from material UI
import RatingStatus from "../RATING/RatingStatus";
import Booking from "../Booking";
import SocialMediaModal from "../SOCIAL-MEDIA/SocialMediaModal";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: violet;
  transition: all 1s ease;
  &:hover {
    color: white;
  }
`;

function RoomCard() {
  const { roomId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { rooms, roomDetail } = useSelector((state) => state.room);
  const { getRoomsInfo } = useRooms();
  const navigate = useNavigate();

  const location = useLocation()
  // console.log(location);

  const filteredRoomsToShow = rooms?.filter(room => location?.state?.from?.toLowerCase().includes(room.bedType)  ) || []
  // console.log(filteredRoomsToShow);

  // console.log(token);

  const handleNavigate = (id) => {
    navigate(`/room-detail/${id}`);
  };

  useEffect(() => {
    roomId ? getRoomsInfo("roomDetail", roomId) : getRoomsInfo();
  }, [roomId]);

  // console.log(rooms);
  // console.log(roomId);
  // console.log(roomDetail);
  const mapRooms =useMemo(() => filteredRoomsToShow.length > 0 ? filteredRoomsToShow : rooms, [filteredRoomsToShow,rooms]) 
  // console.log(mapRooms);

  return (
    <Grid container spacing={4} sx={{ placeContent: "center" }}>
      {roomId ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row-reverse",
              lg: "row-reverse",
              xl: "row-reverse",
            },
            justifyContent: "space-between",
            gap: "2rem",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "#fff",
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "25px",
          }}
        >
          {token ? (
            <Booking />
          ) : (
            <Box
              sx={{
                position: "relative",
                top: { md: "40%", lg: "50%", xl: "50%" },
                fontWeight: "bold",
              }}
            >
              <StyledLink to="/login">
                Please login first for booking
              </StyledLink>
            </Box>
          )}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack sx={{ flexDirection: "row", gap: ".5rem", color: "#fff" }}>
                <Typography sx={{ fontWeight: "900" }}>
                  {roomDetail?.roomNumber}
                </Typography>
                <Typography sx={{ fontWeight: "900" }}>
                  {roomDetail?.bedType}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Typography sx={{ textAlign: "left", fontWeight: "700" }}>
                  Please rate this room.
                </Typography>
                <RatingStatus roomId={roomId} />
              </Stack>
            </Box>
            <Box>
              <img
                src={Array.isArray(roomDetail?.image) && roomDetail?.image[0]}
                alt={roomDetail?.roomNumber}
                style={{ borderRadius: "25px", width: "100%" }}
              />
              <Typography sx={{ fontWeight: "700" }}>
                {roomDetail?.description}
              </Typography>
              <Typography sx={{ fontWeight: "700" }}>
                Per night: ${roomDetail?.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        mapRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room._id}>
            <Card
              sx={{ mt: "1rem", backgroundColor: "rgba(90, 145, 197, 0.7)", color:"#fff" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ backgroundColor: "violet" }}
                    aria-label="recipe"
                  >
                    {room.roomNumber}
                  </Avatar>
                }
              
                title={room.bedType}
                subheader={new Date(room.createdAt).toLocaleDateString()}
              />
              <Box
                sx={{
                  overflow: "hidden",
                  "&:hover img": { transform: "scale(1.2)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="194"
                  image={room.image[0]}
                  alt={room.roomNumber}
                  sx={{ transition: "transform 0.5s ease" }}
                />
              </Box>

              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    width: "25rem",
                    color: "#fff",
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
                {/* RATING */}
                <RatingStatus readOnlyStatus={room.averageRating} />

               {/* SOCIAL MEDIA SHARE */}
                <SocialMediaModal />
                
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
}

export default RoomCard;