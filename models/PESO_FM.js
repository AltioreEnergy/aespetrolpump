const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PESO_FM = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    Class: { type: String },
    Due_Date_of_Stamping: { type: String },
    Upload_Document: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PESO_FM", PESO_FM);
