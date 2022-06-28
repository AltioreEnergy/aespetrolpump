const mongoose = require("mongoose")
const Schema = mongoose.Schema


const tank = new Schema({

    tank:{
        type: String
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model("tank", tank)
