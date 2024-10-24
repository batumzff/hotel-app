import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import useAuthorized from "../../custom-hooks/useAuthorized";
import Stack from "@mui/material/Stack";
import Clients from "./Clients";
import Messages from "./Messages";
import Reservations from "./Reservations";

const Dashboard = () => {
  const { getAuthorizedData } = useAuthorized();
  const location = useLocation();
  // console.log(location);
  const from = location?.state?.from || null;
  // console.log(from);
  const [show, setShow] = useState({
    client: false,
    message: false,
    reservation: false,
    visible: from || null
  });

  useEffect(() => {
    getAuthorizedData();
  }, []);

  const handleShow = (e) => {
    // console.log(e.target.textContent);
    const { textContent } = e.target;
    if (textContent === "Clients") {
      setShow((prev) => ({
        ...prev,
        client: true,
        message: false,
        reservation: false,
        visible:null
      }));
    } else if (textContent === "Messages") {
      setShow((prev) => ({
        ...prev,
        client: false,
        message: true,
        reservation: false,
        visible:"navbar"
      }));
    } else if (textContent === "Reservations") {
      setShow((prev) => ({
        ...prev,
        client: false,
        message: false,
        reservation: true,
        visible:null
      }));
    }
    // else {
    //   setShow((prev) => ({
    //     ...prev,
    //     client: false,
    //     message: false,
    //     reservation: false,
    //   }));
    // }
  };

//  console.log(show.visible);
  return (
    <Box
      onClick={handleShow}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        },
        // justifyContent: "space-between",
        // alignItems: "flex-start",
        gap: "1rem",
        width: "100%",
        height: "100%",
        // p: ".5rem",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          left: "0",
          top: { sm: "0", md: "0", lg: "1rem", xl: "1rem" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "1rem",
          width: "10rem",
          height: "10rem",
          p: "1.5rem",
          backgroundColor: "rgba(234, 184, 219,0.3)",
        }}
      >
        <Stack sx={{ "&:hover": { cursor: "pointer" } }}>Clients</Stack>
        <Stack sx={{ "&:hover": { cursor: "pointer" } }}>Messages</Stack>
        <Stack sx={{ "&:hover": { cursor: "pointer" } }}>Reservations</Stack>
      </Box>
      <Box>
        {show.client && <Clients />}
        {(show.message || show.visible) && <Messages />}
        {show.reservation && <Reservations />}
      </Box>
    </Box>
  );
};

export default Dashboard;