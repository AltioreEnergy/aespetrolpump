const onlinepyment = require("../models/onlinepyment");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const creditgiven = require("../models/creditgivento");
const paymentMod = require("../models/paymentMod");
const _ = require("lodash");
exports.addonlinepyment = async (req, res) => {
  const {
    date,
    dealer_Id,
    paymentmode,
    tidno,
    settlement_amount,
    Settlement_Amount_as_per_shift_management,
    difference,
    Reasons,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let de = rsp.date;
  console.log("date", de);
  ///Settlement_Amount_as_per_shift_management
  let setamt = 0;
  let pm = await paymentMod.findOne({ _id: req.body.paymentmode });
  let mod = pm.mode;
  console.log(mod.toLowerCase());
  if (mod.toLowerCase() == "credit") {
    let cgobj = await creditgiven.find({
      $and: [{ dealer_Id: req.body.dealer_Id }, { date: de }],
    });
    console.log(cgobj);

    for (let element of cgobj) {
      let newarr = element.credit_setalment;
      console.log(newarr);
      setamt = _.sum([newarr]);
    }

    console.log(setamt);
  } else {
    setamt = 0;
  }

  const neweonlinepyment = new onlinepyment({
    date: de,
    dealer_Id: dealer_Id,
    paymentmode: paymentmode,
    tidno: tidno,
    settlement_amount: settlement_amount,
    Settlement_Amount_as_per_shift_management: setamt,
    difference: settlement_amount - setamt,
    Reasons: Reasons,
  });

  neweonlinepyment
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

exports.allonlinepyment = async (req, res) => {
  console.log(res.params);
  await onlinepyment
    .find()
    .sort({ createdAt: -1 })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allonlinepymentMApp = async (req, res) => {
  console.log(res.params);
  await onlinepyment
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("paymentmode")
    .sort({ createdAt: -1 })

    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneonlinepyment = async (req, res) => {
  await onlinepyment
    .findOne({ _id: req.params.id })
    .populate("paymentmode")
    .populate("dealer_Id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteonlinepyment = async (req, res) => {
  await onlinepyment
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonlinepyment = async (req, res) => {
  const findandUpdateEntry = await onlinepyment
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
    .populate("dealer_Id")
    .populate("paymentmode");
  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
