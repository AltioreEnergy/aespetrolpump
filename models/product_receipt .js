const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_receipt = new Schema(
  {
    dealer_Id: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String },
    Invoice_No: { type: Number },
    Tank_Lorry_No: { type: String },
    Total_Invoice_Value: { type: String },
    VAT_MS: { type: Number },
    VAT_HSD: { type: Number },
    TCS_LFR_MS: { type: String },
    TCS_LFR_HSD: { type: String },
    Champer_details: { type: String },
    Product: { type: String },
    Capacity: { type: String },
    Density_As_per_Invoice: { type: String },
    Density_Room_temp_obs: { type: String },
    Room_Temp: { type: Number },
    Density_Observed_at_15_c: { type: Number },
    Difference: { type: Number },
    PL_as_per_Invoice: { type: Number, require: true },
    DL_as_per_Invoice: { type: Number, require: true },
    X: { type: Number },
    Y: { type: Number },
    Pl_Observed: { type: Number },
    DL_Observed: { type: Number },
    X_obs: { type: Number },
    Y_obs: { type: Number },
    Loss_to_be_booked: { type: Number },
    Upload_of_signed_copy_of_Invoice: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product_receipt ", product_receipt);
