const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffattendence = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    name_of_staff: { type: String, require: true },
    designation: { type: String },
    attendence_marking: { type: String, require: true },
    leave_taken: { type: Number },
    leave_available: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("staffattendence", staffattendence);
