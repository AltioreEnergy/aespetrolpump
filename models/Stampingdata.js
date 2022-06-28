const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Stampingdata = new Schema(
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

    MPD: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nozzlemap",
      trim: true,
      default: null,
    },
    nozzel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nozzlemap",
      trim: true,
      default: null,
    },
    Product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tankmap",
      trim: true,
      default: null,
    },
    Last_Stamping_Date: {
      type: String,
      trim: true,
      default: null,
    },
    Due_Date: {
      type: String,
      trim: true,
      default: null,
    },
    K_Factor: {
      type: String,
      trim: true,
      default: null,
    },
    Upload_Certificate: {
      type: Array,
      trim: true,
      default: null,
    },
    Upload_Service_Report: {
      type: Array,
      trim: true,
      default: null,
    },
    Last_Service_Date: {
      type: String,
      trim: true,
      default: null,
    },
    Last_Service_Report: {
      type: Array,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stampingdata", Stampingdata);
