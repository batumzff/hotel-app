import React from "react";
import Box from "@mui/material/Box";
import flower from "../../assets/images/flower.jpg";

const AuthorizedLayout = ({ children }) => {
 
    const layoutStyle = {
        background: `url(${flower})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "absolute",
        height: "100dvh",
        width: "100%",
        padding: "1rem",
        "overflowX":"hidden",
        // "overflowY":"auto"
    }
  return (
    <Box sx={layoutStyle}>
      {children}
    </Box>
  );
};

export default AuthorizedLayout;