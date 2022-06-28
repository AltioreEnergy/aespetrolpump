const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dsmclosingsheet = new Schema(
  {
    date: { type: String },
    dealer_name1: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    name_of_dsm: { type: mongoose.Schema.Types.ObjectId, ref: "dsmform" },
    Nozzle: { type: mongoose.Schema.Types.ObjectId, ref: "nozzlemap" },
    tank: { type: mongoose.Schema.Types.ObjectId, ref: "tankmap" },
    ms_sales: { type: Number },
    ms_testing: { type: Number, default: 0 },
    ms_own_use: { type: Number, default: 0 },
    // hsd_sales: {type: mongoose.Schema.Types.ObjectId,ref:"bm"  },
    hsd_sales: { type: Number },
    hsd_testing: { type: Number, default: 0 },
    hsd_own_use: { type: Number, default: 0 },
    // lubricant_sales: {type: mongoose.Schema.Types.ObjectId,ref:"lubricantsales"},
    lubricant_sales: { type: Number },
    net_cash: { type: Number },
    net_cash_ful: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("dsmclosingsheet", dsmclosingsheet);
