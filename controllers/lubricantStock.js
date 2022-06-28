const lubricantStock = require("../models/lubricantStock");
const lubricantsales = require("../models/lubricantsales");
// const Fuelstock = require("../models/fuel_stock_management");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const _ = require("lodash");
exports.addlubricantStock = async (req, res) => {
  const {
    dealer_Id,
    date,
    allProduct,
    totalSales,
    clsosing_value_Expected,
    actual_closing_value,
    difference,
  } = req.body;

  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("date", de);
  // console.log("rsp", rs2);

  let lubri = await lubricantsales.find({
    $and: [{ dealer_name1: req.body.dealer_Id }, { date: de }],
  });
  let allProductlub = [];
  for (let i of lubri) {
    allProductlub = i.productprice;
  }
  console.log("allProductlub", allProductlub);
  let sumallProductlub = _.sum([allProductlub]);
  {
    let sales = [];
    for (let data of lubri) {
      sales = data.total_sales;
    }
    let totalsalesIub = _.sum([sales]);
    const newlubricantStock = new lubricantStock({
      dealer_Id: dealer_Id,
      date: de,
      allProduct: sumallProductlub,
      totalSales: totalsalesIub,
      clsosing_value_Expected: sumallProductlub - totalsalesIub,
      actual_closing_value: actual_closing_value,
      difference: totalsalesIub - sumallProductlub,
    });

    newlubricantStock
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
//con
exports.alllubricantStock = async (req, res) => {
  //await lubricantsales.remove();
  await lubricantStock
    .find()
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.alllubricantStockApp = async (req, res) => {
  //await lubricantsales.remove();
  await lubricantStock
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonelubricantStock = async (req, res) => {
  await lubricantStock
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletelubricantStock = async (req, res) => {
  await lubricantStock
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatelubricantStock = async (req, res) => {
  console.log(req.params.id);
  await lubricantStock

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
