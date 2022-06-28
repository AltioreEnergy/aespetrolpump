const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ms = new Schema(
    {
      opning_dip: { type: String },
     
   
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("ms", ms);
  