const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dsm_sales = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String, require: true },
    product: { type: String },
    dsm: { type: mongoose.Schema.Types.ObjectId, ref: "dsmclosingsheet" },
    metersales_ms: { type: Number },
    ownuse_ms: { type: Number },
    testing_ms: { type: Number },
    netslesltr_ms: { type: Number },
    netsalesAmount_ms: { type: Number },
    metersales_hsd: { type: Number },
    ownuse_hsd: { type: Number },
    testing_hsd: { type: Number },
    netslesltr_hsd: { type: Number },
    netsalesAmount_hsd: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("dsm_sales", dsm_sales);
