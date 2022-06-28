const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const air_Gauage = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    Due_Date_of_calibration: { type: String },
    Upload_Document: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("air_Gauage", air_Gauage);
