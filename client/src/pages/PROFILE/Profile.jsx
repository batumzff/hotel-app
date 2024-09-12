import React from "react";
import Box from "@mui/material/Box";
import PersonalInfo from "../../components/PERSONAL-INFO/PersonalInfo";
import PersonalReservation from "../../components/PERSONAL-RESERVATION/PersonalReservation";

const Profile = () => {
 
  return (
    <Box>
      <PersonalInfo/>
     <PersonalReservation /> 
    </Box>
  );
};

export default Profile;