import React, { useEffect } from "react";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import useMessages from "../../custom-hooks/useMessages";
import { useSelector } from "react-redux";

const Review = () => {
    const {getMessageInfo} = useMessages()
    const {message} = useSelector(state => state.message)
    console.log(message)

    useEffect(() => {
      getMessageInfo()
      
    }, [])
    

  return (
    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
      <Badge badgeContent={5} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
};

export default Review;
