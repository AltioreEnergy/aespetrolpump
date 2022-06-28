const expensesCm = require("../models/expensesCm");
const expenses = require("../models/expenses");
const _ = require("lodash");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
exports.addexpensesCm = async (req, res) => {
  const {
    dealer_Id,

    date,
    //opening_Value,
    addition,
    // sold,
    // clsosing_value_Expected,
    //actual_closing_value,
    //difference,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });

  console.log(rsp);

  // let rs1 = rsp.rsp1;
  // let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log(de);
  let add1 = 0;
  let exp = await expenses.find({
    $and: [{ dealer_Id: req.body.dealer_Id }, { datea: de }],
  });
  let additionvalue = 0;
  let newarray = [];
  for (const element of exp) {
    let add = element.amount;
    newarray.push(add);
  }
  additionvalue = _.sum(newarray);
  console.log("additionvalue", additionvalue);

  const newexpensesCm = new expensesCm({
    dealer_Id: dealer_Id,
    date: de,

    //opening_Value: opening_Value,
    addition: additionvalue,
    // sold: sold,
    // clsosing_value_Expected: clsosing_value_Expected,
    //  actual_closing_value: actual_closing_value,
    // difference: difference,
  });

  newexpensesCm
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

exports.allexpensesCm = async (req, res) => {
  // await cashincards.remove();
  await expensesCm
    .find()

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allexpensesCmApp = async (req, res) => {
  await expensesCm
    .find({ dealer_Id: req.params.dealer_Id })

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneexpensesCm = async (req, res) => {
  await expensesCm
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteexpensesCm = async (req, res) => {
  await expensesCm
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateexpensesCm = async (req, res) => {
  console.log(req.params.id);
  await expensesCm

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
