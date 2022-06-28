const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipplan = new Schema(
  {
    dealer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
      trim: true,
    },
    date: { type: String },
    transaction_id: {
      type: String,
      trim: true,
    },
    expdate: {
      type: String,
      trim: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "planvideo",
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membershipplan", membershipplan);
