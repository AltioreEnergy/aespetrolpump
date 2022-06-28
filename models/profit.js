const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profit = new Schema(
  {
    dealer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
      trim: true,
    },
    date: { type: String },
    expectedProfit: {
      type: Number,
    },
    netProfit: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("profit", profit);
