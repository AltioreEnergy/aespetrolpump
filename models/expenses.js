const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenses = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String, require: true },
    heading: { type: String },
    amount: { type: Number, require: true },
    authoruzed_by: { type: String },
    dsm_manager: { type: mongoose.Schema.Types.ObjectId, ref: "dsmform" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("expenses", expenses);
