import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/FORM-INPUTS/MyButton";
import Box from "@mui/material/Box";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7971.jpg?size=626&ext=jpg&ga=GA1.2.1457292162.1713696621&semt=ais_hybrid')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "calc(100vh - 90px)",
        position: "absolute",
        zIndex: "99",
      }}
    >
      <div>
        <MyButton
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: { translate: "-50%, -50%" },
            backgroundColor:"#B07FF6"
          }}
          onClick={() => navigate("/")}
        >
          Home
        </MyButton>
      </div>
    </Box>
  );
};

export default NotFound;