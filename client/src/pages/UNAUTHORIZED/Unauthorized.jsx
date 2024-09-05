import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/MODAL/MyModal";
import MyButton from "../../components/FORM-INPUTS/MyButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Unauthorized = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const handleLogin = () => {
    setShow(false);
    navigate("/login");
  };

  return (
    <MyModal open={show} onClose={handleClose}>
      <Typography variant="h6">Authorization Problem</Typography>

      <Box>
        You will be redirected to the home page in 5 seconds because you have no permission
        for this page
      </Box>
      <Stack spacing={2}>
        <MyButton onClick={handleClose}>Go Home</MyButton>
        <MyButton onClick={handleLogin}>Login</MyButton>
      </Stack>
    </MyModal>
  );
};

export default Unauthorized;