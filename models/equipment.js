const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    nature: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    purchased_on: {
      type: String,
      required: true,
    },
    dealer: {
      type: Schema.Types.ObjectId,
      ref: "dealerform",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("equipment", thisSchema);
