"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const PaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["usd", "eur", "gbp", "try", "aud"],
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,  // Change status to String
      enum: ['requires_payment_method', 'requires_action', 'succeeded', 'failed'],  // Add other statuses as needed
      required: true,
    },
  },
  {
    collection: "payments",
    timestamps: true,
  }
);

module.exports = model("Payment", PaymentSchema);
