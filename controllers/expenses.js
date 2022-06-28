const expenses = require("../models/expenses");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
exports.addexpenses = async (req, res) => {
  const { dealer_Id, date, heading, amount, authoruzed_by, dsm_manager } =
    req.body;
  let rsp = await RSP.find({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });

  console.log(rsp);

  // let rs1 = rsp.rsp1;
  // let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log(de);
  const newexpenses = new expenses({
    dealer_Id: dealer_Id,
    date: de,
    heading: heading,
    amount: amount,
    authoruzed_by: authoruzed_by,
    dsm_manager: dsm_manager,
  });

  newexpenses
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

exports.allexpenses = async (req, res) => {
  await expenses
    .find()
    .populate("dsm_manager")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allexpensesApp = async (req, res) => {
  await expenses
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dsm_manager")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneexpenses = async (req, res) => {
  await expenses
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteexpenses = async (req, res) => {
  await expenses
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateexpenses = async (req, res) => {
  console.log(req.params.id);
  await expenses

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
