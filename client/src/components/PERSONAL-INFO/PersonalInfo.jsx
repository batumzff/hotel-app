import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { formRegisterInputs } from "../../Helpers/formInputs";
import AuthForm from "../AUTH-FORM/AuthForm";
import { IconButton, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../Helpers/formValidation";
import MyButton from "../FORM-INPUTS/MyButton";
import CloseIcon from "@mui/icons-material/Close";
import useAuthCalls from "../../custom-hooks/useAuthCalls";

const PersonalInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { updateUser } = useAuthCalls();
  const id = user?.id;
const [open, setOpen] = useState(false)

const handleForm = () => {
  setOpen(prev=>!prev)
  
}
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    updateUser(id, data);
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  console.log(user);

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"1rem", padding:"1rem"}}>
      {user?.image ? (
        <img src={user?.image} alt={user?.username} width={350} style={{borderRadius:"20%"}} className="profile-img" />
      ) : (
        <AccountCircleIcon sx={{ fontSize: "10rem", color: "#1976D2" }} />
      )}
      <Typography>{user?.username}</Typography>
      <Typography>{user?.biography}</Typography>
      {open ? <Box
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          border: "2px solid gray",
          width: "50%",
          padding: "1rem",
          margin: "1rem auto",
          borderRadius: ".4rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",

          "@media (max-width: 500px)": {
            border: "none",
            boxShadow: "none",
          },
        }}
      >
        <Box
            onClick={handleForm}
          sx={{
            position: "absolute",
            top: "5px",
            right: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid gray",
            borderRadius: "50%",
          }}
        >
          <CloseIcon
            sx={{ "&:hover": { color: "red", transition: "0.5s ease" } }}
          />
        </Box>
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
          { formRegisterInputs.map((item) => (
            <Stack
              key={item.name}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {item.name == "password" ? (
                <Box sx={{ position: "relative" }}>
                  <TextField
                    data-test={item["data-test"]}
                    label={item.label}
                    type={showPassword ? "text" : "password"}
                    id={item.id}
                    name={item.name}
                    {...register(item.name)}
                    required
                  />
                  <IconButton
                    aria-label="toggle password visibility"
                    sx={{ position: "absolute", right: "1rem", top: "1rem" }}
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
                  defaultValue={user[item.name]}
                  {...register(item.name)}
                />
              )}
              <Box sx={{ color: "red" }}>{errors[item.name]?.message}</Box>
            </Stack>
          ))}
          <MyButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "SENDING" : "SUBMIT"}
          </MyButton>
        </Box>
      </Box>
      :
      <Typography
          variant="h6"
          onClick={handleForm}
          sx={{
            cursor: "pointer",
            width: "230px",
            display: "flex",
            alignItems: "center",
            transition: "color 0.3s",
            color: "inherit",
            "&:hover": {
              color: "red",
            },
            "&:hover .arrow-icon": {
              opacity: 1,
              transform: "translateX(5px)",
            },
          }}
        >
          Update Personal Info
          <ArrowForwardIcon
            className="arrow-icon"
            sx={{
              marginLeft: "8px",
              opacity: 0,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          />
        </Typography>}
    </Box>
  );
};

export default PersonalInfo;