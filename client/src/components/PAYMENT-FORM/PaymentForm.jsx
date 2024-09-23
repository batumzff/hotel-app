// import React, { useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Box, Button, CircularProgress, TextField, Alert } from '@mui/material';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useSelector } from 'react-redux';
// import { cardSchema } from '../../Helpers/formValidation';
// import { useNavigate } from 'react-router-dom';
// import useBooking from '../../custom-hooks/useBooking';
// import useAxios from '../../custom-hooks/useAxios';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [paymentSucceeded, setPaymentSucceeded] = useState(false);
//   const { user } = useSelector(state => state.auth)
//   const { booking } = useSelector(state => state.booking)
//   const { axiosWithToken } = useAxios()
// console.log(user);
// console.log(booking);
// const { getReservationInfo } = useBooking()

// useEffect(() => {
//   getReservationInfo(user?.id)
// }, [])


//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, isSubmitSuccessful },
//     reset,
//   } = useForm({ resolver: yupResolver(cardSchema) });
  
// const navigate = useNavigate()

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setErrorMessage('');


//     if (elements == null) {
//       return;
//     }
    
//     // Get card details from CardElement
//     const cardElement = elements.getElement(CardElement);

// console.log(cardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       setErrorMessage(error.message);
//       setLoading(false);
//     } else {
//       console.log('Payment method created:', paymentMethod);
//       setPaymentSucceeded(true);
//       setLoading(false);
      
//       // Handle backend API call with paymentMethod.id
//       const  result  = await axiosWithToken.post("payments/create",{amount:booking[0]?.totalPrice, currency:"usd",status:"card" })
//      console.log(result.data);
//       // Make API call to save payment and finalize the transaction
//     }
//   };

//   useEffect(() => {
//     isSubmitSuccessful && reset()
     
//     //  const timer = setTimeout(() => {
//     // navigate("/profile") 
//     // }, 2000);
//     // return(() => clearTimeout(timer))
//   }, [isSubmitSuccessful, reset]);

//   return (
//     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: '1rem auto', p:".5rem" }}>
      
//       {/* Full Name Field */}
     
//           <TextField
//             label="Full Name"
//             name="fullName"
//             defaultValue={`${user?.firstName} ${user?.lastName}` }
//             fullWidth
//             error={!!errors.fullName}
//             helperText={errors.fullName ? errors.fullName.message : ''}
//             sx={{ mb: 2 }}
//             required
//             {...register("fullName")}
//           />
        
//       {/* Email Field */}
//           <TextField
//             label="Email"
//              name="email"
//              defaultValue={`${user?.email}`}
//             fullWidth
//             error={!!errors.email}
//             helperText={errors.email ? errors.email.message : ''}
//             sx={{ mb: 2 }}
//             required
//             {...register("email")}
//           />
      

//       {/* Card Element */}
//       <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
//         <CardElement options={{ hidePostalCode: true }} />
//       </Box>

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         disabled={!stripe || loading}
//         fullWidth
//         startIcon={loading ? <CircularProgress size={20} /> : null}
//       >
//         {loading ? 'Processing...' : 'Pay'}
//       </Button>

//       {/* Error Alert */}
//       {errorMessage && (
//         <Box mt={2}>
//           <Alert severity="error">{errorMessage}</Alert>
//         </Box>
//       )}

//       {/* Success Alert */}
//       {paymentSucceeded && (
//         <Box mt={2}>
//           <Alert severity="success">Payment successful!</Alert>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default PaymentForm;

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, TextField, Alert } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { cardSchema } from '../../Helpers/formValidation';
import { useNavigate } from 'react-router-dom';
import useBooking from '../../custom-hooks/useBooking';
import useAxios from '../../custom-hooks/useAxios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { booking } = useSelector(state => state.booking);
  const { axiosWithToken } = useAxios();
  const { getReservationInfo } = useBooking();

  const navigate = useNavigate();

  useEffect(() => {
    getReservationInfo(user?.id);
  }, [user?.id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(cardSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Stripe or Elements not properly initialized.');
      setLoading(false);
      return;
    }

    // Get card details from CardElement
    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: data.fullName,
          email: data.email,
        },
        
      });

      if (paymentMethodError) {
        // console.log("error:",paymentMethodError.message)
        throw new Error(paymentMethodError.message);
      }

      console.log('Payment method created:', paymentMethod);

      // Make API call to create PaymentIntent on the backend
      const { data: { clientSecret } } = await axiosWithToken.post("payments/create", {
        amount: booking[0]?.totalPrice * 100, // Stripe accepts amounts in cents
        currency: "usd",
        status:true,
      });
console.log(clientSecret)
      // Confirm card payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setPaymentSucceeded(true);
        console.log('Payment successful:', paymentIntent);

        // Optionally, navigate to the profile page or other confirmation page
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: '1rem auto', p: ".5rem" }}>
      
      {/* Full Name Field */}
      <TextField
        label="Full Name"
        name="fullName"
        defaultValue={`${user?.firstName} ${user?.lastName}`}
        fullWidth
        error={!!errors.fullName}
        helperText={errors.fullName ? errors.fullName.message : ''}
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
        helperText={errors.email ? errors.email.message : ''}
        sx={{ mb: 2 }}
        required
        {...register("email")}
      />

      {/* Card Element */}
      <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || isSubmitting || loading}
        fullWidth
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Processing...' : 'Pay'}
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
