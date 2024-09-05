import Box from "@mui/material/Box";
import RoomCard from "../../components/ROOM-CARD/RoomCard";

const Rooms = () => {
  return (
    <Box
      sx={{
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RoomCard />
    </Box>
  );
};

export default Rooms;
