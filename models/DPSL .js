const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DPSL = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    Due_Date: { type: String },
    Upload_Document: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DPSL ", DPSL);
