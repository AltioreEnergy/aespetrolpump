const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cm_hsd_stock = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String },
    opening_Value: { type: Number },
    addition: { type: Number },
    sold: { type: Number },
    clsosing_value_Expected: { type: Number },
    actual_closing_value: { type: Number },
    difference: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cm_hsd_stock", cm_hsd_stock);
