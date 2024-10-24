import React from "react";
import AuthForm from "../components/AUTH-FORM/AuthForm";
import  Stack  from "@mui/material/Stack";
import ErrorModal from "../components/ERROR-MODAL/ErrorModal"


const Register = () => {


  return (
   
      <Stack sx={{marginTop:"5rem", justifyContent:"center", alignItems: "center"}}>
          <ErrorModal/>
          <AuthForm formType={"register"} schema={"registerSchema"} />
      </Stack>
   
  );
};

export default Register;