const cashinbank = require("../models/cashinbank");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
exports.addcashinbank = async (req, res) => {
  const {
    dealer_Id,
    bank,
    date,
    opening_Value,
    addition,
    sold,
    clsosing_value_Expected,
    actual_closing_value,
    difference,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });

  console.log(rsp);

  // let rs1 = rsp.rsp1;
  // let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log(de);
  const newcashinbank = new cashinbank({
    dealer_Id: dealer_Id,
    date: de,
    bank: bank,
    opening_Value: opening_Value,
    addition: addition,
    sold: sold,
    clsosing_value_Expected: clsosing_value_Expected,
    actual_closing_value: actual_closing_value,
    difference: actual_closing_value - clsosing_value_Expected,
  });

  newcashinbank
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

exports.allcashinbank = async (req, res) => {
  await cashinbank
    .find()

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcashinbankApp = async (req, res) => {
  await cashinbank
    .find({ dealer_Id: req.params.dealer_Id })

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonecashinbank = async (req, res) => {
  await cashinbank
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecashinbank = async (req, res) => {
  await cashinbank
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecashinbank = async (req, res) => {
  console.log(req.params.id);
  await cashinbank

    .findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};
