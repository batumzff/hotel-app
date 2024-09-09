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

const schemaMap = {
  loginSchema,
  registerSchema,
};

const AuthForm = ({ formType, schema }) => {
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
    formType == "register"
      ? dispatch(registerUser(data))
      : dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const handleNavigate = () => {
    console.log("handle navigate active");
    formType === "login" ? navigate("/register") : navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid gray",
          width: "25rem",
          borderRadius: ".4rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
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
                  <TextField
                    data-test={item["data-test"]}
                    label={item.label}
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    {...register(item.name)}
                  />
                  <Box>{errors[item.name]?.message}</Box>
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
                  <TextField
                    data-test={item["data-test"]}
                    label={item.label}
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder=" "
                    {...register(item.name)}
                  />
                  <Typography>{errors[item.name]?.message}</Typography>
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

          <Stack sx={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"1rem"}}>
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
    </Box>
  );
};

export default AuthForm;
