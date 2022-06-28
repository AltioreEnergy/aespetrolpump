const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const profilepic = mongoose.Schema(
    {
      id: {
        type: String,
        generated: true,
        trim: true,
      },
      dealer_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
      },
      profilepic:{
        type: Array,
        trim: true,
        default: null,
      },
      
    },
    
      {timestamps: true},
    
  );
   
  
  
  
module.exports = mongoose.model("profilepic", profilepic);

//module.exports = mongoose.model("bm", baymanagement);
