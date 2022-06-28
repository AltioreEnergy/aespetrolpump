const lubricantsales = require("../models/lubricantsales");
const resp = require("../helpers/apiresponse");
const lubestock = require("../models/lubestock");
const RSP = require("../models/rsp");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addlubricantsales = async (req, res) => {
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_name1 }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  const {
    dealer_name1,
    date,
    lube_grade,
    total_pieces_available,
    no_of_pieces_sold,
    selling_price,
    dsm,
    mode_of_pyament,
    total_amount,
    productprice,

    discount,
    name_of_credit_customer,
    total_sales,
  } = req.body;
  let lub = await lubestock.findOne({ _id: req.body.lube_grade });
  let pieces = lub.no_of_pieces;
  let price = lub.selling_price_maintained;
  const newlubricantsales = new lubricantsales({
    dealer_name1: dealer_name1,
    date: de,
    lube_grade: lube_grade,
    total_pieces_available: pieces,
    no_of_pieces_sold: no_of_pieces_sold,
    selling_price: price,
    dsm: dsm,
    mode_of_pyament: mode_of_pyament,
    total_amount: total_amount,
    productprice: pieces * price,
    discount: discount,
    name_of_credit_customer: name_of_credit_customer,
    total_sales: no_of_pieces_sold * price - discount,
  });

  newlubricantsales
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
//con
exports.alllubricantsales = async (req, res) => {
  //await lubricantsales.remove();
  await lubricantsales
    .find()
    .populate("dealer_name1")
    .populate([
      {
        path: "lube_grade",
        select: "grade",
      },
    ])
    .populate([
      {
        path: "mode_of_pyament",
        select: "mode",
      },
    ])
    .populate("dsm")
    .populate("name_of_credit_customer")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.alllubricantsalesApp = async (req, res) => {
  //await lubricantsales.remove();
  await lubricantsales
    .find({ dealer_name1: req.params.dealer_name1 })
    .populate("dealer_name1")
    .populate([
      {
        path: "lube_grade",
        select: "grade",
      },
    ])
    .populate([
      {
        path: "mode_of_pyament",
        select: "mode",
      },
    ])
    .populate("dsm")
    .populate("name_of_credit_customer")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonelubricantsales = async (req, res) => {
  await lubricantsales
    .findOne({ _id: req.params.id })
    .populate("dealer_name1")
    .populate([
      {
        path: "lube_grade",
        select: "grade",
      },
    ])
    .populate([
      {
        path: "mode_of_pyament",
        select: "select_mode",
      },
    ])
    .populate("dsm")
    .populate("name_of_credit_customer")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletelubricantsales = async (req, res) => {
  await lubricantsales
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatelubricantsales = async (req, res) => {
  console.log(req.params.id);
  await lubricantsales

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
    .populate("name_of_credit_customer")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};
