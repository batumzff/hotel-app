import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../../custom-hooks/useAuthCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../Helpers/formValidation";
import { formRegisterInputs, formLoginInputs } from "../../Helpers/formInputs";
import { DevTool } from "@hookform/devtools";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MyButton from "../FORM-INPUTS/MyButton";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schemaMap = {
  loginSchema,
  registerSchema,
};

const AuthForm = ({ formType, schema }) => {
  const { registerUser, login } = useAuthCalls();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
    // console.log("submit data", data);
    formType == "register"
      ? dispatch(registerUser(data))
      : dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const handleNavigate = () => {
    // console.log("handle navigate active");
    formType === "login" ? navigate("/register") : navigate("/login");
  };

  return (
    <Stack
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid gray",
        width: "50%",
        padding: "1rem",
        margin: "1rem auto",
        borderRadius: ".4rem",
        backgroundColor:"rgba(255,255,255,0.7)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",

        "@media (max-width: 500px)": {
          border: "none",
          boxShadow: "none",
        },
      }}
    >
      <Typography>{formType === "login" ? "" : "Register Form"}</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formType == "register"
          ? formRegisterInputs.map((item) => (
              <Stack
                key={item.name}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                {item.name == "password" ? (
                  <Box sx={{position:"relative"}}>
                    <TextField
                      data-test={item["data-test"]}
                      label={item.label}
                      type={showPassword ? "text" : "password"}
                      id={item.id}
                      name={item.name}
                      {...register(item.name)}
                    />
                    <IconButton
                  aria-label="toggle password visibility"
                  sx={{position:"absolute", right:"1rem", top:"1rem"}}
                  onClick={handleClickShowPassword}
                  
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                  </Box>
                ) : (
                  <TextField
                    data-test={item["data-test"]}
                    label={item.label}
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    {...register(item.name)}
                  />
                )}
                <Box sx={{color:"red"}}>{errors[item.name]?.message}</Box>
              </Stack>
            ))
          : formLoginInputs.map((item) => (
              <Stack
                key={item.name}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
               {item.name == "password" ? (
                  <Box sx={{position:"relative"}}>
                    <TextField
                      data-test={item["data-test"]}
                      label={item.label}
                      type={showPassword ? "text" : "password"}
                      id={item.id}
                      name={item.name}
                      {...register(item.name)}

                    />
                    <IconButton
                  aria-label="toggle password visibility"
                  sx={{position:"absolute", right:"1rem", top:"1rem"}}
                  onClick={handleClickShowPassword}
                  
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                  </Box>
                ) : (
                  <TextField
                    data-test={item["data-test"]}
                    label={item.label}
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    {...register(item.name)}
                  />
                )}
                <Typography sx={{color:"red"}}>{errors[item.name]?.message}</Typography>
              </Stack>
            ))}
        <MyButton
          type="submit"
          disabled={isSubmitting}
          data-test="loginRegisterSubmit"
        >
          {isSubmitting
            ? "Submitting..."
            : formType === "register"
            ? "Register"
            : "Login"}
        </MyButton>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {formType === "login"
              ? "Don't have an account?"
              : "Already have an account"}
          </Box>
          <MyButton
            style={{ margin: ".5rem" }}
            onClick={handleNavigate}
            data-test="loginRegisterButton"
          >
            {formType === "login" ? "Register Page" : "Login Page"}
          </MyButton>
        </Stack>
      </Box>
      <DevTool control={control} />
    </Stack>
  );
};

export default AuthForm;