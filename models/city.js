const mongoose = require("mongoose")
const Schema = mongoose.Schema


const citySchema = new Schema({

    state_id:{ type: Schema.Types.ObjectId},
    name: {
        type: String,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("city", citySchema)