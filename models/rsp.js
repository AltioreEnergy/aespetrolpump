const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rsp = new Schema(
  {
    dealer_Id:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    date: { type: String, require: true },
    opneing_liter1:{type:Number},
    opneing_dip1:{ type: Number},
    rsp1: { type: Number },
    opneing_liter2:{type: Number},
    opneing_dip2:{type:Number},
    rsp2: { type: Number },   
  },
  { timestamps: true }
);
module.exports = mongoose.model("rsp", rsp);
