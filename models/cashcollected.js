const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cashcollected = new Schema(
  {
    date: { type: String, require: true },
    dealer_name: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    dsm_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dsmform" },
    _2000: { type: Number },
    _500: { type: Number },
    _200: { type: Number },
    _100: { type: Number },
    _50: { type: Number },
    _20: { type: Number },
    _10: { type: Number },
    _5: { type: Number },
    _2: { type: Number },
    _1: { type: Number },
    total: { type: Number },
    upi_Cash: { type: Number },
    credit_cash: { type: Number },
    debit_cash: { type: Number },
    credit: { type: Number },
    cash_use: { type: Number },
    final_cash: { type: Number },
    cash_difference: { type: Number },
    cash_handed_over_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menegeraddfrom",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cashcollected", cashcollected);
