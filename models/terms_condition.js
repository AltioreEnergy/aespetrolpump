const mongoose = require("mongoose")
const Schema = mongoose.Schema


const TermConditionSchema = new Schema({

    desc:{
        type: String
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model("terms_condition", TermConditionSchema)
