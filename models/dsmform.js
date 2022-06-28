const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    dealer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealerform",
      trim: true,
      default: null,
    },
    dsm_name: { type: String, require: true },
    password: { type: String, require: true },
    addres: { type: String },
    mobile: { type: Number, require: true },
    joining_date: { type: String, require: true },
    adhar_number: { type: Number, require: true },
    adharimg: { type: Array, require: true },

    pan_number: { type: String },
    panImg: { type: Array },
    photograh: { type: Array, require: true },
    date_of_brith: { type: String, require: true },
    salary_decieded: { type: String, require: true },
    salary_date: { type: String, require: true },
    apprpved_leave: { type: String, require: true },
    status: { type: String,
    default:"Active" },

    shiftManagment: { type: Boolean, default: false },
    stockManagment: { type: Boolean, default: false },
    cashManagment: { type: Boolean, default: false },
    facilityManagment: { type: Boolean, default: false },
    roconfiguration: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("dsmform", thisSchema);
