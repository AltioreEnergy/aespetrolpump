const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationtwoSchema = new Schema(
  {
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },

    staff: { type: mongoose.Schema.Types.ObjectId, ref: "stafform" },

    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notificationtwo", notificationtwoSchema);
