const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const capacity = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    capacity:{
        type: String,
        trim: true,
        default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("capacity", capacity);

