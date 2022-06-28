const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FMotherEquipment = new Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "equipment",
      trim: true,
      default: null,
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

module.exports = mongoose.model("FMotherEquipment", FMotherEquipment);
