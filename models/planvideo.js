const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    video_link:{
        type:String,
        required:true
    },
    associated_plan:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("planvideo", thisSchema);
