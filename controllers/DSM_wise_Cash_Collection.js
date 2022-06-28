const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse");
const creditgiven = require("../models/creditgivento");
const dsmclosing = require("../models/dsmclosingsheet");
const lubricantsales = require("../models/lubricantsales");
const _ = require("lodash");
const RSP = require("../models/rsp");
const expenses = require("../models/expenses");
exports.DSM_wise_Cash_Collection = async (req, res) => {
  const { date, dealer_Id } = req.body;
  let cashobj = await cashcollected
    .find({
      $and: [{ date: date }, { dealer_name: dealer_Id }],
    })
    .populate("dsm_Id")
    .populate("cash_handed_over_to");
  console.log("tttttttttt", cashobj);
  if (cashobj == null) {
    res.status(400).json({
      status: false,
      msg: "record not found",
    });
  } else {
    let dsm_name = [];
    let creditgiven = [];
    let manager = [];
    let upi_Cash = [];
    let debit_cash = [];
    let credit_cash = [];

    console.log(cashobj);
    //dsm name
    for (const element of cashobj) {
      dsm_name.push(element.dsm_Id.dsm_name);
    }
    ///creditgiven
    for (const element of cashobj) {
      creditgiven.push(element.credit);
    }
    let sum_credit = _.sum(creditgiven);
    console.log(sum_credit);
    creditgiven.push("Total", sum_credit);

    //manager
    for (const element of cashobj) {
      manager.push(
        "cash_handed_over_to",
        element.cash_handed_over_to.maneger_name
      );
    }
    //debit_cash
    for (const element of cashobj) {
      debit_cash.push(element.debit_cash);
    }
    let sum_debitcash = _.sum(debit_cash);
    console.log(sum_debitcash);
    debit_cash.push("Total", sum_debitcash);
    //upi_Cash
    for (const element of cashobj) {
      upi_Cash.push(element.upi_Cash);
    }
    let sum_upi_Cash = _.sum(upi_Cash);
    console.log(sum_upi_Cash);
    upi_Cash.push("Total", sum_upi_Cash);
    //credit_cash
    for (const element of cashobj) {
      credit_cash.push(element.credit_cash);
    }
    let sum_credit_cash = _.sum(credit_cash);
    console.log(sum_credit_cash);
    credit_cash.push("Total", sum_credit_cash);
    //net salese ful
    let net_sel = [];

    let Net_Sales = await dsmclosing
      .find({
        $and: [{ date: req.body.date }, { dealer_name1: req.body.dealer_Id }],
      })
      .populate("tank")
      .populate("name_of_dsm");
    for (const iterator of Net_Sales) {
      //  net_sel.push(iterator.name_of_dsm.dsm_name);
      net_sel.push(iterator.net_cash_ful);
    }
    let sum_net_sel = _.sum(net_sel);
    console.log(sum_net_sel);
    net_sel.push("Total", sum_net_sel);
    ////net cash lub
    netsales_lub = [];
    let lubricant = await lubricantsales
      .find({
        $and: [{ dealer_name1: req.body.dealer_Id }, { date: req.body.date }],
      })
      .populate("dsm")
      .sort({
        createdAt: -1,
      });
    console.log("lubricant", lubricant);
    for (const iterator of lubricant) {
      //  netsales_lub.push(iterator.dsm.dsm_name);
      netsales_lub.push(iterator.total_sales);
    }
    let sum_net_sellub = _.sum(netsales_lub);
    console.log(sum_net_sellub);
    netsales_lub.push("Total", sum_net_sellub);
    let data = {
      date: date,
      dsm_name: dsm_name,
      net_sel_fule: net_sel,
      netsales_lub: netsales_lub,
      credit_given: creditgiven,
      Net_Cash_handed_over_to_Manager: manager,
      upi_Cash: upi_Cash,
      debit_cash: debit_cash,
      credit_cash: credit_cash,
    };
    res.status(200).json({
      status: true,
      data: data,
    });
  }
};
