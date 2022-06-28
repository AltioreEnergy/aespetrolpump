const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema(
  {
    dealer_name1:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},

    select_mode: {type: String},
    select_bank: { type: mongoose.Schema.Types.ObjectId,ref:"bank"},
    settlement_day: { type:String }
    
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("payment", payment);
