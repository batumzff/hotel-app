import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../../custom-hooks/useAuthCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../Helpers/formValidation";
import { formRegisterInputs, formLoginInputs } from "../../Helpers/formInputs";
// import { DevTool } from "@hookform/devtools";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Button from "../BUTTON/Button"

const schemaMap = {
  loginSchema,
  registerSchema,
};

export default function FormPropsTextFields() {

  const { registerUser, login } = useAuthCalls();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resolvedSchema = schemaMap[schema];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(resolvedSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    // formType == "register"
    //   ? dispatch(registerUser(data))
    //   : 
    dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  // const handleNavigate = () => {
  //   formType === "login" ? navigate("/register") : navigate("/login");
  // };

  const handleLogin = ()=>{}

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <Stack sx={{justifyContent:"center", alignItems:"center", border:"2px solid red",}}>
        <TextField
          required
          id="outlined-username-input"
          label="Username"
          type='text'
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          type='text'
        />
        <TextField
        required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      <Button onClick={handleLogin} />
      </Stack>
    </Box>
  );
}