const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlinepyment = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
    },
    date: {
      type: String,
      trim: true,
      default: null,
    },

    paymentmode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentMod",
      trim: true,
      default: null,
    },

    tidno: {
      type: String,
      trim: true,
      default: null,
    },
    settlement_amount: {
      type: Number,
      trim: true,
      default: null,
    },

    Settlement_Amount_as_per_shift_management: {
      type: Number,
      trim: true,
      default: null,
    },
    difference: {
      type: Number,
      trim: true,
      default: null,
    },
    Reasons: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("onlinepyment", onlinepyment);
