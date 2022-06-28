const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outher_document = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    Due_Date: { type: String },
    Upload_Document: { type: Array },
    remark: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("outher_document ", outher_document);
