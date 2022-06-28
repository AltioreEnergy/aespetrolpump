const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema(
  {
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("about", aboutSchema);
