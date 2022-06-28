const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thermometerFM = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },

    calibration_Due_Date: { type: String },
    Upload_Document: { type: Array },
    Upload_certificate: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("thermometerFM", thermometerFM);
