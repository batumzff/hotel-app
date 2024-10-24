import { Box, Stack, Typography } from "@mui/material";
import ImageSlider from "../components/IMAGE-SLIDER/ImageSlider";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    // e.target.textContent == "Book Now"
    //   ? navigate("/booking")
    //   : navigate("/rooms");
    navigate( "/rooms")
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color:"white"
      }}
    >
      <Typography variant="h3">PyScript Hotels Group</Typography>
      {/* IMAGE-SLIDER */}
      <ImageSlider />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <Typography
      variant="h4"
      onClick={handleNavigate}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "color 0.3s",
        color: "inherit",
        "&:hover": {
          color: "red",
        },
        "&:hover .arrow-icon": {
          opacity: 1,
          transform: "translateX(5px)",
        },
      }}
    >
      Visit Our Rooms
      <ArrowForwardIcon
        className="arrow-icon"
        sx={{
          marginLeft: "8px",
          opacity: 0,
          transition: "opacity 0.3s, transform 0.3s",
        }}
      />
    </Typography>

        <Typography
          variant="h4"
          onClick={handleNavigate}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "color 0.3s",
            color: "white",
            "&:hover": {
              color: "red",
            },
            "&:hover .arrow-icon": {
              opacity: 1,
              transform: "translateX(5px)",
            },
          }}
        >
          Book Now
          <ArrowForwardIcon
        className="arrow-icon"
        sx={{
          marginLeft: "8px",
          opacity: 0,
          transition: "opacity 0.3s, transform 0.3s",
        }}
      />
        </Typography>
      </Stack>
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          backgroundColor:"rgba(0,0,0,0.1)",
          padding:".5rem",
          color:"inherit"
          
        }}
      >
        <Typography sx={{fontWeight:"bolder"}}>
          Welcome to PyScript Hotel – Your Gateway to Comfort and Luxury
        </Typography>
        <Typography variant="h6" component="p" sx={{fontWeight:"bolder"}}>
          At PyScript Hotel, we believe that every stay should be extraordinary.
          Located in the heart of California, our hotel offers a harmonious
          blend of modern elegance and timeless charm, providing the ideal
          setting for both business and leisure travelers. From the moment you
          step through our doors, you'll be greeted with warm hospitality,
          impeccable service, and attention to detail that sets us apart.
        </Typography>
        <Typography variant="h6" component="p" sx={{fontWeight:"bold"}}>
          Our beautifully appointed rooms and suites are designed with your
          comfort in mind, offering luxurious bedding, modern amenities, and
          stunning views of the surrounding city or serene landscapes. Whether
          you're here to explore the bustling streets of California, indulge in
          a romantic getaway, or attend a business meeting, you'll find
          everything you need to relax and rejuvenate.
        </Typography>
        <Typography variant="h6" component="p" sx={{fontWeight:"bold"}}>
          Start your day with a gourmet breakfast at our on-site restaurant,
          where our culinary team prepares fresh, locally-sourced dishes to suit
          every palate. After a day of sightseeing or meetings, unwind at our
          spa, take a dip in the pool, or enjoy a cocktail in our cozy lounge.
        </Typography>
        <Typography variant="h6" component="p" sx={{fontWeight:"bold"}}>
          At PyScript Hotel, we pride ourselves on offering more than just a
          place to stay. We are your home away from home, where every detail is
          carefully crafted to ensure your experience is nothing short of
          exceptional. Let us make your stay unforgettable with personalized
          services, exclusive offers, and the warm, inviting atmosphere that
          only PyScript Hotel can provide.
        </Typography>
        <Typography variant="h6" component="p" sx={{fontWeight:"bold"}}>
          We invite you to discover a world of comfort, convenience, and
          relaxation at PyScript Hotel. Whether it's your first visit or you're
          a returning guest, we are committed to making your stay as enjoyable
          and memorable as possible.
        </Typography>
      </Box>
      <Typography variant="h5" sx={{fontWeight:"bolder", color:"white"}}>Where you'll be</Typography>
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