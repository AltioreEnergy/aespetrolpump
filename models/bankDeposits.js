const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankDeposits = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String },
    Opening_Balance: { type: Number },
    Deposited_today: { type: Number },
    Expense_today: { type: Number },
    Clsosing_Balance_Expected: { type: Number },
    document_upload: { type: Array },
    Remarks: { type: String },
    Dealers_Concurrence: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("bankDeposits", bankDeposits);
