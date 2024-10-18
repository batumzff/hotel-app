import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, TextField, Alert } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { cardSchema } from "../../Helpers/formValidation";
import { useLocation, useNavigate } from "react-router-dom";
import useBooking from "../../custom-hooks/useBooking";
import useAxios from "../../custom-hooks/useAxios";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);
  const { axiosWithToken } = useAxios();

  const location = useLocation()
  const { from, data:{total} } = location.state || {}

  console.log("from: ", from);
  console.log("data from location: ", total);

  console.log(user);
  console.log(booking);

  const { getReservationInfo } = useBooking();

  useEffect(() => {
    getReservationInfo(user?.id);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(cardSchema) });

  const navigate = useNavigate();



  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    if (elements == null) {
      return;
    }

    // Get card details from CardElement
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      console.log("Payment method created:", paymentMethod);
      setPaymentSucceeded(true);
      setLoading(false);

      // Handle backend API call with paymentMethod.id
      const result = await axiosWithToken.post("payments/create", {
        amount: total * 100,
        currency: "usd",
        status: true,
      });
      console.log(result.data);
      // Make API call to save payment and finalize the transaction
    }
  };

  useEffect(() => {
    isSubmitSuccessful && reset();

    const timer = setTimeout(() => {
      paymentSucceeded && navigate("/profile");
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSubmitSuccessful]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, margin: "1rem auto", p: ".5rem", backgroundColor:"rgba(255, 255, 255, 0.8)" }}
    >
      {/* Full Name Field */}

      <TextField
        label="Full Name"
        name="fullName"
        defaultValue={`${user?.firstName} ${user?.lastName}`}
        fullWidth
        error={!!errors.fullName}
        helperText={errors.fullName ? errors.fullName.message : ""}
        sx={{ mb: 2 }}
        required
        {...register("fullName")}
      />

      {/* Email Field */}
      <TextField
        label="Email"
        name="email"
        defaultValue={`${user?.email}`}
        fullWidth
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        sx={{ mb: 2 }}
        required
        {...register("email")}
      />

      {/* Card Element */}
      <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!total || !stripe || loading }
        fullWidth
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? "Processing..." : "Pay"}
      </Button>

      {/* Error Alert */}
      {errorMessage && (
        <Box mt={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}

      {/* Success Alert */}
      {paymentSucceeded && (
        <Box mt={2}>
          <Alert severity="success">Payment successful!</Alert>
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;