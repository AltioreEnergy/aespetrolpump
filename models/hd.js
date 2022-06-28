const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hd = new Schema(
    {
      date :{type : String},
      opneing_liter1: { type: mongoose.Schema.Types.ObjectId,ref:"baymanagement" },
   
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("hd", hd);
  