import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../components/ERROR-PAGE/ErrorPage";
import AuthForm from "../../components/AUTH-FORM/AuthForm";
import { Stack } from "@mui/material";
import ErrorModal from "../../components/ERROR-MODAL/ErrorModal";

const Login = () => {
  // const { error } = useSelector((state) => state.auth);
 
  return (
      <Stack sx={{justifyContent:"center", alignItems: "center"}}>
       {/* <ErrorPage/> */}
       <ErrorModal/>
          <Stack sx={{justifyContent:"center", alignItems: "center"}}>
            <AuthForm formType={"login"} schema={"loginSchema"}/>
          </Stack>
        
      </Stack>
    
  );
};

export default Login;