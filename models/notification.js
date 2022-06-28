const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },

    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationSchema);
