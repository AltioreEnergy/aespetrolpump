const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tankmap = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"dealerform",
        trim: true,
    },
    tank:{
        type: String,
        trim: true,
        default: null,
    },
    Product:{
        type:String,
        trim: true,
        default: null
    },
capacity:{
    type:String,
    trim: true,
    default: null
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("tankmap", tankmap);
