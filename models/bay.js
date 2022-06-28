const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    id: {
      type: String,
      generated: true,
    },
    bay:{
        type: String,
        trim: true,
        default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("bay", thisSchema);
