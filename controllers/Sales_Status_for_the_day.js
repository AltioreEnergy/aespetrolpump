const Fuelstock = require("../models/fuel_stock_management");
const dsmclosing = require("../models/dsmclosingsheet");
const RSP = require("../models/rsp");
const _ = require("lodash");
exports.salesReport = async (req, res) => {
  const { date, dealer_Id, product } = req.body;
  let rsp = await RSP.findOne({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: req.body.date }],
  }).sort({
    createdAt: -1,
  });
  //rsp
  console.log("rsp", rsp);
  let opningvalue = [];
  let rsprecord = [];

  if (rsp == null) {
    res.status(400).json({
      status: false,
      msg: "record not found",
    });
  } else {
    console.log("rsp", rsp);
    let rspms = rsp.rsp1;
    let rsphsd = rsp.rsp2;
    let de = rsp.date;

    if (product.toLowerCase() == "ms") {
      rsprecord.push(rsp.rsp1);
    } else {
      if (product.toLowerCase() == "hsd") {
        rsprecord.push(rsp.rsp2);
      } else {
        rsprecord.push(rsp.rsp1);
        rsprecord.push(rsp.rsp2);
      }
    }
    ///opning liter
    if (product.toLowerCase() == "ms") {
      opningvalue.push(rsp.opneing_liter1);
    } else {
      if (product.toLowerCase() == "hsd") {
        opningvalue.push(rsp.opneing_liter2);
      } else {
        opningvalue.push(rsp.opneing_liter1);
        opningvalue.push(rsp.opneing_liter2);
      }
    }

    console.log("date RSP", de);
    console.log("rspms RSP", rspms);
    console.log("rsphsd RSP", rsphsd);
  }
  let tankreord = [];
  let total_expected_stock = [];
  let actual_closing_stock = [];
  let loss_gain = [];
  ///tank
  let tankfind = await Fuelstock.find({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: req.body.date }],
  }).populate("tank");
  console.log("aaaaaaaaaa", tankfind);
  if (tankfind === null) {
    res.status(400).json({
      status: false,
      msg: "record not found",
    });
  } else {
    for (const iterator of tankfind) {
      console.log("for", iterator.tank.tank);
      if (
        iterator.tank.Product.toLowerCase() == req.body.product.toLowerCase()
      ) {
        tankreord.push(iterator.tank.tank);
        console.log("if", iterator.tank.tank);
        tankreord.push(iterator.tank.Product);
      } else {
        tankreord.push();
      }
      if (req.body.product.toLowerCase() == "both") {
        tankreord.push(iterator.tank.tank);
        tankreord.push(iterator.tank.Product);
      }
    }
    console.log("tankreord1", tankreord);
    //total_expected_stock
    for (const iterator of tankfind) {
      if (
        iterator.tank.Product.toLowerCase() == req.body.product.toLowerCase()
      ) {
        total_expected_stock.push(iterator.total_expected_stock);
      } else {
        total_expected_stock.push();
      }
      if (req.body.product.toLowerCase() == "both") {
        total_expected_stock.push(iterator.total_expected_stock);
      }
    }
    let expected_stock = _.sum(total_expected_stock);
    total_expected_stock.push("total", expected_stock);

    //actual_closing_stock
    for (const iterator of tankfind) {
      if (
        iterator.tank.Product.toLowerCase() == req.body.product.toLowerCase()
      ) {
        actual_closing_stock.push(iterator.actual_closing_stock);
      } else {
        actual_closing_stock.push();
      }
      if (req.body.product.toLowerCase() == "both") {
        actual_closing_stock.push(iterator.actual_closing_stock);
      }
    }
    let closing_stock = _.sum(actual_closing_stock);
    actual_closing_stock.push("total", closing_stock);
    //loss_gain

    for (const iterator of tankfind) {
      if (
        iterator.tank.Product.toLowerCase() == req.body.product.toLowerCase()
      ) {
        loss_gain.push(iterator.loss_gain);
      } else {
        loss_gain.push();
      }
      if (req.body.product.toLowerCase() == "both") {
        loss_gain.push(iterator.loss_gain);
      }
    }
  }
  let loss = _.sum(loss_gain);
  loss_gain.push("total", loss);

  //net sales
  product_sale = [];

  let salesobj = await dsmclosing
    .find({
      $and: [{ dealer_name1: req.body.dealer_Id }, { date: req.body.date }],
    })
    .populate([
      {
        path: "Nozzle",
        populate: [
          {
            path: "tank_map",
            populate: [
              {
                path: "tank",
              },
            ],
          },
        ],
      },
    ]);

  for (const iterator of salesobj) {
    if (req.body.product.toLowerCase() == "ms") {
      product_sale.push(iterator.ms_sales);
    } else {
      product_sale.push();
    }
    if (req.body.product.toLowerCase() == "hsd") {
      product_sale.push(iterator.hsd_sales);
    } else {
      product_sale.push();
    }

    if (req.body.product.toLowerCase() == "both") {
      product_sale.push(iterator.ms_sales);
      product_sale.push(iterator.hsd_sales);
    } else {
      product_sale.push();
    }
  }
  let sale = _.sum(product_sale);
  product_sale.push("total", sale);

  let data = {
    tankreord: tankreord,
    opningvalue: opningvalue,
    rsprecord: rsprecord,
    product_sale: product_sale,
    Current_Stock_Expected: total_expected_stock,
    Closign_Stock: actual_closing_stock,
    loss_gain: loss_gain,
  };
  if (data) {
    res.status(200).json({
      status: true,
      data: data,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "record not found",
    });
  }
};
