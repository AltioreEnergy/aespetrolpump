const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nozzlemap = new Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    dealer_id: {
        type: mongoose.Schema.Types.ObjectId,ref:"dealerform",
        trim: true,
    },
    nozzle:{
        type: String,
        trim: true,
        default: null,
    },
    mpd:{
        type:String,
        trim: true,
        default: null
    },
bay:{
    type: String,
    trim: true,
    default: null
},
tank_map:{
    type: mongoose.Schema.Types.ObjectId,ref:"tankmap",
    trim: true,
    default: null
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("nozzlemap", nozzlemap);
