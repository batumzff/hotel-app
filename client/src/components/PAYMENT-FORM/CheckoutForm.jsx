// import React, { useCallback, useState, useEffect } from "react";
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import axios from "axios";
// import useAxios from "../../custom-hooks/useAxios";


// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// // This is your test secret API key.
// // const stripePromise = loadStripe("pk_test_51PzxH92K6rJD1OP6qchkjRGfh9i4gjM24Hw4Lws9nhGVC2q0WwbjgWuZNvNUFeiKcaFX5UeTaEDUiaQZsiLou2lB001sV9juVE");
// const stripePromise = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_KEY);

// const CheckoutForm = ({total_price}) => {
//   const {axiosWithToken} = useAxios()

//   const fetchClientSecret = useCallback(async () => {
//     // Create a Checkout Session
//     try {const data = await axiosWithToken.post("/create-checkout-session",{total_price},{
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_SECRET_PAYMENT_KEY}`, // Add your Stripe secret key here
//       },
//     })
// console.log(data)
// const clientSecret = data?.data?.clientSecret;
// return clientSecret
//     } catch (error) {
//       console.log(error)
//     }


//     // return fetch("/create-checkout-session", {
//     //   method: "POST",
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => data.clientSecret);
//   }, []);

//   const options = {fetchClientSecret};

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// export default CheckoutForm



// import React, { useCallback } from "react";
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import useAxios from "../../custom-hooks/useAxios";

// // Use the Stripe public key (publishable key)
// const stripePromise = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_KEY);

// const CheckoutForm = ({ total_price }) => {
//   const { axiosPublic, axiosWithToken} = useAxios();

  // const fetchClientSecret = useCallback(async () => {
  //   try {
  //     // Create a Checkout Session
  //     const { data } = await axiosPublic.post("/create-checkout-session", { total_price });
  //     console.log(data);
  //     const clientSecret = data?.clientSecret; // Ensure you're extracting `clientSecret` correctly
  //     return clientSecret;
  //   } catch (error) {
  //     console.error("Error fetching client secret:", error);
  //   }
  // }, [total_price, axiosPublic]); // Add dependencies for useCallback
//   const fetchClientSecret = useCallback(async () => {
//     try {
//       const { data } = await axiosWithToken.post("/create-checkout-session", { total_price });
//       return data.clientSecret;
//     } catch (error) {
//       console.error("Error fetching client secret:", error);
//     }
//   }, [total_price, axiosWithToken]);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export default CheckoutForm;

import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from "axios";
import useAxios from "../../custom-hooks/useAxios";

// Load the public key for Stripe (you can safely load this on the frontend)
const stripePromise = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_KEY); // This is pk_...

const CheckoutForm = ({ total_price }) => {
  const {axiosPublic} = useAxios()

  const fetchClientSecret = useCallback(async () => {
    try {
      // Request to your backend to create a session and return clientSecret
      const { data } = await axiosPublic.post("create-checkout-session", { total_price });
      return data.clientSecret;  // Return client secret from backend
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  }, [total_price]);

  const options = { clientSecret: fetchClientSecret() };  // Pass clientSecret to Stripe

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;

