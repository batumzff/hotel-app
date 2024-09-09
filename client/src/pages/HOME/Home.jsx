import { Box, Stack, Typography } from "@mui/material";
import RoomCard from "../../components/ROOM-CARD/RoomCard";
import ImageSlider from "../../components/IMAGE-SLIDER/ImageSlider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.target.textContent == "Book Now"
      ? navigate("/booking")
      : navigate("/rooms");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Welcome to PyScript Hotels Group</Typography>
      {/* <RoomCard/> */}
      <ImageSlider />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h4" onClick={handleNavigate}>
          Visit Our Rooms
        </Typography>
        <Typography variant="h4" onClick={handleNavigate}>
          Book Now
        </Typography>
      </Stack>
      <Typography variant="h5">Where you’ll be</Typography>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d145864.40742311336!2d-120.10493419337175!3d36.11350908185277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sKaliforniya%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1725877622901!5m2!1str!2str"
        width="80%"
        height="450"
        
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
};

export default Home;
