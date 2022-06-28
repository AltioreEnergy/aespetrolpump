const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hydrometerFM = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    scale: { type: String },
    calibration_Due_Date: { type: String },
    Upload_Document: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hydrometerFM", hydrometerFM);
