const Payment = require("../models/payment");
const resp = require("../helpers/apiresponse");
const paymentMod= require("../models/paymentMod");
exports.addpayment = async (req, res) => {
  const {
    dealer_name1,
    select_mode,
    select_bank,
    settlement_day,
   
  } = req.body;

  const newpayment= new Payment({
    dealer_name1:dealer_name1,
    select_mode: select_mode,
    select_bank:  select_bank,
    settlement_day:settlement_day
  });
 
  newpayment
  .save()
  .then((data) => {
    res.status(200).json({
      status: true,
      msg: "success",
      data: data,
    });
  })
  .catch((error) => {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  });

};
exports.allpayment = async (req, res) => {
 // await Payment.remove();
    await Payment
      .find().populate([{
        path:"select_bank",
        select:"name_of_bank"
      }]).populate("dealer_name1").populate([{
        path:"select_mode",
        select:"mode"
      }])
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.allpaymentApp = async (req, res) => {
    await Payment
      .find({dealer_name1:req.params.dealer_name1}).populate([{
        path:"select_bank",
        select:"name_of_bank"
      }]).populate("dealer_name1").populate([{
        path:"select_mode",
        select:"mode"
      }])
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonepayment = async (req, res) => {
    
    await Payment
      .findOne({ _id: req.params.id }).populate("dealer_name1").populate([{
        path:"select_bank",
        select:"name_of_bank"
      }]).populate([{
        path:"select_mode",
        select:"mode"
      }])
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
 
  exports.updateonepayment= async (req, res) => {
    const findoneandupdate = Payment
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
        },
        { new: true }
      ).populate("dealer_name1").populate([{
        path:"select_bank",
        select:"name_of_bank"
      }]).populate([{
        path:"select_mode",
        select:"mode"
      }])
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.deletepayment = async (req, res) => {
 
    await Payment
 
      .deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.addmode = async (req, res) => {
    const {
      mode
     
    } = req.body;
  
    const newmode= new paymentMod({
      mode:mode
    
    });
    const findexist = await paymentMod.findOne({ mode: mode });
    if (findexist) {
      resp.alreadyr(res,'Payment Mode');
    } else {
    newmode
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
  }
  };
  exports.allmode = async (req, res) => {
    await paymentMod
      .find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };