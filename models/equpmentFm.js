const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equpmentFm = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
      trim: true,
      default: null,
    },

    Equipment: {
      type: String,
    },

    Due_Date: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("equpmentFm", equpmentFm);
