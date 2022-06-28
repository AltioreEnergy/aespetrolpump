const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equairySchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("equairy", equairySchema);
