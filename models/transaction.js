const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    bank_name: {
      type: String,
      required: true,
    },
    credit_limit_bank: {
      type: String,
      required: true,
    },
    interest_rate: {
      type: String,
      required: true,
    },
    account_no: {
      type: String,
      required: true,
    },
    ifsc_code: {
      type: String,
      required: true,
    },
    validity_date_upto: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("banktransaction", thisSchema);
