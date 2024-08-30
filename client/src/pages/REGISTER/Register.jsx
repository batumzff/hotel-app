import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../Components/ERROR-PAGE/ErrorPage";
import AuthForm from "../../Components/AUTH-FORM/AuthForm";
import "./Register.css";

const Register = () => {
  const { error } = useSelector((state) => state.auth);

  return (
    <section >
      <main >
        {error ? (
          <ErrorPage />
        ) : (
          <AuthForm formType={"register"} schema={"registerSchema"} />
        )}
      </main>
    </section>
  );
};

export default Register;
