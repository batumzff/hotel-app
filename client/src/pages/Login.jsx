import React from "react";
import AuthForm from "../components/AUTH-FORM/AuthForm";
import Stack  from "@mui/material/Stack";
import ErrorModal from "../components/ERROR-MODAL/ErrorModal";

const Login = () => {

  return (
    <Stack sx={{flexDirection:"row", justifyContent: "center", alignItems: "center" }}>
      <ErrorModal />
      <AuthForm formType={"login"} schema={"loginSchema"} />
    </Stack>
  );
};

export default Login;