const MsStock = require("../models/cm_ms_stock");
const Fuelstock = require("../models/fuel_stock_management");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const _ = require("lodash");
exports.addMsStock = async (req, res) => {
  const {
    dealer_Id,
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
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("date", de);
  console.log("rsp", rs1);
  let margin = 3.0;
  let sumtankrec = 0;
  let sumnetsalesms = 0;
  let sumclosingstockms = 0;

  ////adition

  let as = await Fuelstock.find({
    $and: [{ date: de }, { dealer_Id: req.body.dealer_Id }],
  }).populate("tank");
  console.log(as);
  var newarr1 = as.map(function (value) {
    return value.tank.Product;
  });

  let ricept = as.map(function (value) {
    if (value.tank.Product == "MS") {
      return value.tank_receipt;
    }
  });

  console.log("ricept", ricept);

  sumtankrec = _.sum([...ricept]);
  console.log("sum ricept", sumtankrec);

  ///sold

  var netsalesms = as.map(function (value) {
    if (value.tank.Product == "MS") {
      return value.net_sales;
    }
  });

  console.log("netsalesms", netsalesms);
  sumnetsalesms = _.sum([...netsalesms]);
  console.log("sum net sales", sumnetsalesms);

  ///actual_closing_value

  var closingstockms = as.map(function (value) {
    if (value.tank.Product == "MS") {
      return value.actual_closing_stock;
    }
  });

  console.log("closing", closingstockms);
  sumclosingstockms = _.sum([...closingstockms]);
  console.log("sum closing", sumclosingstockms);

  ///// opnig value
  let ov = await MsStock.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });

  // let ovValue = ov.actual_closing_value;

  if (ov == null) {
    console.log("privious day stok", ov);
    let msstockobject = {
      dealer_Id: dealer_Id,
      date: de,
      opening_Value: 0,
      addition: sumtankrec * (rs1 - margin),
      sold: sumnetsalesms * (rs1 - margin),
      clsosing_value_Expected:
        0 + sumtankrec * (rs1 - margin) - sumnetsalesms * (rs1 - margin),
      actual_closing_value: sumclosingstockms * (rs1 - margin),
      difference:
        sumclosingstockms * (rs1 - margin) -
        (0 * (rs1 - margin) +
          sumtankrec * (rs1 - margin) -
          sumnetsalesms * (rs1 - margin)),
    };
    let result = await MsStock.create(msstockobject);
    resp.successr(res, result);
  } else {
    let ovValue = ov.actual_closing_value;
    const newMsStock = new MsStock({
      dealer_Id: dealer_Id,
      date: de,
      opening_Value: ovValue * (rs1 - margin),
      addition: sumtankrec * (rs1 - margin),
      sold: sumnetsalesms * (rs1 - margin),
      clsosing_value_Expected:
        ovValue * (rs1 - margin) +
        sumtankrec * (rs1 - margin) -
        sumnetsalesms * (rs1 - margin),
      actual_closing_value: sumclosingstockms * (rs1 - margin),
      difference:
        sumclosingstockms * (rs1 - margin) -
        (ovValue * (rs1 - margin) +
          sumtankrec * (rs1 - margin) -
          sumnetsalesms * (rs1 - margin)),
    });
    newMsStock
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

exports.allMsStock = async (req, res) => {
  //await MsStock.remove();
  await MsStock.find()
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allMsStockApp = async (req, res) => {
  //await Fuelstock.remove();
  await MsStock.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateMsStock = async (req, res) => {
  console.log(req.params.id);
  await MsStock.findOneAndUpdate(
    {
      _id: req.params.id,
    },

    {
      $set: req.body,
    },
    { new: true }
  )
    .populate("dealer_id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};

exports.deleteMsStock = async (req, res) => {
  await MsStock.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneMsStock = async (req, res) => {
  await MsStock.findOne({ _id: req.params.id })
    .populate("dealer_Id")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
