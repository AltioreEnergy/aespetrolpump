const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreditBankFM = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
    },

    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
      trim: true,
      default: null,
    },

    Sanctioned_Amount: {
      type: Number,
      trim: true,
      default: null,
    },
    Uplaod_Document: {
      type: Array,
      trim: true,
      default: null,
    },

    Remarks: {
      type: String,
      trim: true,
      default: null,
    },
    Interest_Rate: {
      type: Number,
      trim: true,
      default: null,
    },
    Type_of_Loan: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditBankFM", CreditBankFM);
