import { useNavigate } from "react-router-dom";
import { memberImages } from "../../assets/PyScript-members/memberImages";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const About = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/about-details/${id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">PyScript Groups</Typography>
      <Typography variant="h4">more than a life style</Typography>
      <Typography variant="p">
        We began our journey with a group of Full Stack Developers and keeping
        our enthusiast on IT World and at the same time we are serving people
        who deserve the best at anytime for anything with our best.
      </Typography>
      <Typography variant="p">
        We are trying to be everywhere with the best quality to make you get
        what you deserve in your life journey. We hope to see you more frequent
        to serve you the best quality with the best price that makes you smile
        and get comfortable.
      </Typography>

      <Grid container spacing={4} sx={{ placeContent: "center" }}>
        {memberImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={3} onClick={()=>handleClick(image.id)} key={image.id}>
            <img src={image.imageAddress} alt="members" />
            <div>{image.info}</div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About;