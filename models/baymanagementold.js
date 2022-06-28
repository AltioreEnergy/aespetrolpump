const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baymanagement = new Schema(
  {

    dealer_Id:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    dsm__Id: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    date:{type: String, require: true},
   
    nozzel:{ type: mongoose.Schema.Types.ObjectId,ref:"nozzlemap" },
    product:{ type:String },
    closing_Entry:{type:Number},
    opening_total: {type:Number, default:0},
   
    //dsm_name1: { type: mongoose.Schema.Types.ObjectId,ref:"dsmform" },
    closing_Entry_MS:{type: Number},
    closing_Entry_HSD:{type: Number},
    closing_total_MS: {type: Number},
    closing_total_HSD: {type: Number},
    sumMS:{type: Number},
    sumHSD:{type: Number},
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("bm", baymanagement);
