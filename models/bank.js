const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bank = new Schema(
  {
    dealer_name1: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    name_of_bank: { type: String, require: true },
    credit_limit_of_bank: { type: Number, require: true },
    intrest_rates: { type: Number, require: true },
    account_no: { type: Number },
    ifsc_code: { type: String },
    cresit_offer: { type: String },
    document_upload: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("bank", bank);
