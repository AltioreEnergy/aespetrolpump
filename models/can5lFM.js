const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const can5lFM = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    Due_Date_of_Stamping: { type: String },
    Upload_Document: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("can5lFM", can5lFM);
