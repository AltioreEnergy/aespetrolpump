const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lubricantStock = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String },
    allProduct: { type: Number },
    totalSales: { type: Number },
    clsosing_value_Expected: { type: Number },
    actual_closing_value: { type: Number },
    difference: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("lubricantStock", lubricantStock);
