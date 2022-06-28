const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cashincards = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    cards: { type: String },
    date: { type: String },
    opening_Value: { type: Number },
    addition: { type: Number },
    payment_received: { type: Number },
    clsosing_value_Expected: { type: Number },
    actual_closing_value: { type: Number },
    difference: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cashincards", cashincards);
