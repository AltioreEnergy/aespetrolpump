const mongoose = require("mongoose")
const Schema = mongoose.Schema


const paymentMod = new Schema({

    mode:{
        type: String
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model("paymentMod", paymentMod)
