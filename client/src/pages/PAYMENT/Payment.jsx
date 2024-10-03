import Box from "@mui/material/Box";
import React from "react";
// import PaymentForm from "../../components/PAYMENT-FORM/PaymentForm";
import CheckoutForm from "../../components/PAYMENT-FORM/CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { total_price } = location.state || {}; 
console.log(total_price)
  return (
    <Box>
      {/* <PaymentForm /> */}
      <CheckoutForm total_price={total_price}/>
    </Box>
  );
};

export default Payment;