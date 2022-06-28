const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lubestock = new Schema(
  {
    dealer_name1: { type: mongoose.Schema.Types.ObjectId, ref: "dealerform" },
    date: { type: String, require: true },
    grade: { type: String },
    opening_stock: { type: Number },
    rsp: { type: Number },
    purchase_price: { type: Number },
    selling_price_maintained: { type: Number },
    no_of_pieces: { type: Number },
    amount_before_tax: { type: Number },
    cgst: { type: Number },
    sgst: { type: Number },
    final_inventory: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("lubestock", lubestock);
