"use strict";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");

module.exports = {
  paymentInfo: async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).send({
        error: true,
        message: "Amount and currency are required.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    const payment = new Payment({
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      // status: paymentIntent.status,
      status: "succeeded",
    });
    const data = await payment.save();
    // console.log("data in payment: ",  paymentIntent.status);
    // console.log("data in payment: ", data);

    res.status(200).send({
      error: false,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, 
    });
  },

  confirmPaymentStatus: async (req, res) => {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Update the payment status in the database
      await Payment.findOneAndUpdate(
        { paymentIntentId },
        { status: paymentIntent.status }
      );
      return res.status(200).send({ message: "Payment succeeded" });
    } else {
      return res.status(400).send({ message: "Payment not completed" });
    }
  },
};
