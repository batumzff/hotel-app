import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../components/ERROR-PAGE/ErrorPage";
import AuthForm from "../../components/AUTH-FORM/AuthForm";
import "./Login.css";
import LoginForm from "../../components/FORM-INPUTS/LoginForm";

const Login = () => {
  const { error } = useSelector((state) => state.auth);

  return <section>{error ? <ErrorPage /> : <LoginForm />}</section>;
};

export default Login;
