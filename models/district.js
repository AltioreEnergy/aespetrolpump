const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const district = new Schema(
    {
        state_id: {type: mongoose.Schema.Types.ObjectId,ref:"state"},

        district: {
            type: String,
            trim: true,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("district", district);
