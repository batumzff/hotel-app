import Box from "@mui/material/Box";
import RoomCard from "../../components/ROOM-CARD/RoomCard";

const Rooms = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "5rem",
        // padding:"3rem"
      }}
    >
      <RoomCard />
    </Box>
  );
};

export default Rooms;