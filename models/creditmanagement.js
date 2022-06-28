const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditmanagement = new Schema(
  {  
    date:{type:String},
    dealer_name:{type: mongoose.Schema.Types.ObjectId,ref:"dealerform"},
    name_of_customer: { type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    vehicle_no: { type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    opening_balance: {type: Number},
    credit_limit: {type: mongoose.Schema.Types.ObjectId,ref:"creditcustomers" },
    payment_overdue: { type: Number },
    additional_credit_given_today: { type: Number },
    total_outstanding:{type:Number},
    payment_term:{type:String}
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("creditmanagement", creditmanagement);
