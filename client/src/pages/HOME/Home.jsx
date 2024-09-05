import { Box, Typography } from "@mui/material";
import RoomCard from "../../components/ROOM-CARD/RoomCard";

const Home = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
      <Typography variant="h3">Welcome to PyScript Hotels Group</Typography>
      <RoomCard/>
    </Box>
  );
};

export default Home;