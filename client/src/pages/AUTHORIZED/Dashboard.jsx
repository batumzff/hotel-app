import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import useAuthorized from "../../custom-hooks/useAuthorized";
import Stack from "@mui/material/Stack";
import Clients from "./Clients";
import Messages from "./Messages";
import Reservations from "./Reservations";

const Dashboard = () => {
  const { getAuthorizedData } = useAuthorized();

  const [show, setShow] = useState({
    client: false,
    message: false,
    reservation: false,
  });

  useEffect(() => {
    getAuthorizedData();
  }, []);

  const handleShow = (e) => {
    console.log(e.target.textContent);
    const { textContent } = e.target;
    if (textContent === "Clients") {
      setShow((prev) => ({
        ...prev,
        client: true,
        message: false,
        reservation: false,
      }));
    } else if (textContent === "Messages") {
      setShow((prev) => ({
        ...prev,
        client: false,
        message: true,
        reservation: false,
      }));
    } else {
      setShow((prev) => ({
        ...prev,
        client: false,
        message: false,
        reservation: true,
      }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:{xs:"column", sm:"column", md:"row", lg:"row", xl:"row"},
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
        width: "100%",
        height: "100%",
        p: ".5rem",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          left: "0",
          top: {sm:"0", md:"0", lg:"1rem", xl:"1rem"},
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "1rem",
          width: "10rem",
          height: "10rem",
          p: "1.5rem",
          backgroundColor:"rgba(234, 184, 219,0.3)",
        }}
      >
        <Stack onClick={handleShow} sx={{"&:hover":{cursor:"pointer"}}}>Clients</Stack>
        <Stack onClick={handleShow} sx={{"&:hover":{cursor:"pointer"}}}>Messages</Stack>
        <Stack onClick={handleShow} sx={{"&:hover":{cursor:"pointer"}}}>Reservations</Stack>
      </Box>
      <Box sx={{display:"flex", justifyContent:"flex-end",width:"80%"}}>
        {show.client && <Clients />}
        {show.message && <Messages />}
        {show.reservation && <Reservations />}
      </Box>
    </Box>
  );
};

export default Dashboard;