const Fuelstock = require("../models/fuel_stock_management");
const dsmclosing = require("../models/dsmclosingsheet");
const RSP = require("../models/rsp");
const resp = require("../helpers/apiresponse");
const _ = require("lodash");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addFuelstock = async (req, res) => {
  const {
    dealer_Id,
    date,

    tank,
    meter_sales,
    testing,
    net_sales,
    tank_receipt,
    loss_booked,
    total_expected_stock,
    actual_closing_stock,
    loss_gain,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let sales = 0;
  let meterseale = [];
  let testingp = [];
  let testingall = 0;
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("date fulstock", de);
  let dsm = await dsmclosing
    .find({
      $and: [
        { tank: req.body.tank },
        { date: de },
        { dealer_name1: req.body.dealer_Id },
      ],
    })
    .populate("tank");
  let FS = await Fuelstock.findOne({
    $and: [{ dealer_Id: dealer_Id }, { tank: tank }],
  }).sort({ createdAt: -1 });
  console.log(FS);
  if (dsm == null) {
    res.status(400).json({
      status: false,
      msg: "add dsm closing sheet same tank or dealer",
    });
  } else {
    for (const iterator of dsm) {
      if (iterator.tank.Product.toLowerCase() == "ms") {
        console.log(iterator.tank.Product.toLowerCase());
        meterseale.push(iterator.ms_sales);
      } else {
        console.log(iterator.tank.Product.toLowerCase());
        meterseale.push(iterator.hsd_sales);
      }
    }
    console.log("meterseale", meterseale);
    sales = _.sum([...meterseale]);
    ///testing

    for (const iterator of dsm) {
      if (iterator.tank.Product.toLowerCase() == "ms") {
        testingp.push(iterator.ms_testing);
      } else {
        testingp.push(iterator.hsd_testing);
      }
    }
    console.log("testing", testingp);
    testingall = _.sum([...testingp]);
  }
  ///priveous day fulctock

  if (FS == null) {
    console.log("if", FS);
    let fsobject = {
      dealer_Id: dealer_Id,
      date: de,
      tank: tank,
      meter_sales: sales,
      testing: testingall,
      net_sales: sales - testingall,
      tank_receipt: tank_receipt,
      loss_booked: loss_booked,
      total_expected_stock: sales - testingall + tank_receipt - loss_booked,
      actual_closing_stock: actual_closing_stock,
      loss_gain:
        actual_closing_stock -
        (sales - testingall + tank_receipt - loss_booked),
    };
    let result = await Fuelstock.create(fsobject);
    res.json({
      status: true,
      msg: "success",
      data: result,
    });
  } else {
    console.log("else", FS);
    let fuelstock = FS.actual_closing_stock;

    const newFuelstock = new Fuelstock({
      dealer_Id: dealer_Id,
      date: de,
      tank: tank,
      meter_sales: sales,
      testing: testingall,
      net_sales: sales - testingall,
      tank_receipt: tank_receipt,
      loss_booked: loss_booked,
      total_expected_stock:
        fuelstock - ((sales - testingall) + tank_receipt - loss_booked),
      actual_closing_stock: actual_closing_stock,
      loss_gain:
        actual_closing_stock -
        (fuelstock - ((sales - testingall) + tank_receipt - loss_booked)),
    });
    //console.log(net_cash);

    newFuelstock
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
exports.allFuelstock = async (req, res) => {
  //await Fuelstock.remove();
  await Fuelstock.find()
    .populate("dealer_Id")
    .populate("tank")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allFuelstockApp = async (req, res) => {
  //await Fuelstock.remove();
  await Fuelstock.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .populate("tank")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateFuelstock = async (req, res) => {
  console.log(req.params.id);
  await Fuelstock.findOneAndUpdate(
    {
      _id: req.params.id,
    },

    {
      $set: req.body,
    },
    { new: true }
  )
    .populate("dealer_id")
    .populate("tank")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};

exports.deleteFuelstock = async (req, res) => {
  await Fuelstock.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneFuelstock = async (req, res) => {
  await Fuelstock.findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .populate("tank")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
