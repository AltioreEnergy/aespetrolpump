const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const closing_bm = new Schema(
  {
    
    closing_entry:{
      type: Number,
      trim: true,
      default: null,
    },
    bm_id:{
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      default: null,
    },
    dsm_id:{
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      default: null,
    },
    dsm_name: { 
      type: String,
      trim: true,
      default: null, 
    },
    remanning_ltr:{
      type: Number,
      trim: true,
      default: null,
    }
   
  },
  {
    //timestamps: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);
module.exports = mongoose.model("c_bm", closing_bm);
