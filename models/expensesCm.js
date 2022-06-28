const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesCm = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String },
    //  opening_Value: { type: Number, default: 0 },
    addition: { type: Number, default: 0 },
    // sold: { type: Number, default: 0 },
    // clsosing_value_Expected: { type: Number, default: 0 },
    // actual_closing_value: { type: Number, default: 0 },
    // difference: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("expensesCm", expensesCm);
