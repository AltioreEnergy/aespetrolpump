const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    
    product:{
        type: String,
        trim: true,
        default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", product);
