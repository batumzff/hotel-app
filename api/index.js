"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
const message = require("./src/models/message");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

// Query Handler:
app.use(require("./src/middlewares/queryHandler"));

// Logger:

// Auhentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to HOTEL API",
    user: req.user,
  });
});


/* ------------------------STRIPE------------------------------- */

// app.post('/create-checkout-session', async (req, res) => {
//   console.log(req.body)
//   const total_price = req.body.total_price
//   const session = await stripe.checkout.sessions.create({
//     ui_mode: 'embedded',
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd', 
//           product_data: {
//             name: 'Room Reservation', 
//           },
//           unit_amount: total_price * 100, 
//         },
//         quantity: 1, 
//       },
//     ],
//     mode: 'payment',
//     return_url: `${process.env.DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
//   });

//   res.send({clientSecret: session.client_secret});
// });

// app.get('/session-status', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });
app.post('/create-checkout-session', async (req, res) => {
 
    
    const total_price = req.body.total_price;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Room Reservation',
            },
            unit_amount: total_price * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`, // Handle successful payment
      cancel_url: `${process.env.DOMAIN}/cancel`, // Handle cancelled payments
    });

    // Return session id to the client
    res.send({ sessionId: session.id });
   
});


/* ------------------------------------------------------- */


app.all("*", (req, res) => {

  res.status(404).send({
    error: true,
    message: "This route is not valid",
  });
});





// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
