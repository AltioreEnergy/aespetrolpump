const dsm_sales = require("../models/dsm_sales");

const RSP = require("../models/rsp");
const dsmclosing = require("../models/dsmclosingsheet");
const resp = require("../helpers/apiresponse");

const _ = require("lodash");

exports.adddsmsales = async (req, res) => {
  const {
    dealer_Id,
    date,
    product,
    dsm,
    tank,
    //ms
    metersales_ms,
    ownuse_ms,
    testing_ms,
    netslesltr_ms,
    netsalesAmount_ms,
    //hsd
    metersales_hsd,
    ownuse_hsd,
    testing_hsd,
    netslesltr_hsd,
    netsalesAmount_hsd,
  } = req.body;
  //rsp
  let rsp = await RSP.findOne({
    $and: [{ dealer_Id: req.body.dealer_Id }, { date: req.body.date }],
  }).sort({
    createdAt: -1,
  });
  console.log("rsp", rsp);
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
    console.log("date RSP", de);
    console.log("rspms RSP", rspms);
    console.log("rsphsd RSP", rsphsd);
    //ms entry
    let hsd_sales = [];
    let hsd_testing = [];
    let hsd_own_use = [];

    if (product.toLowerCase() == "hsd") {
      let hsdrecord = await dsmclosing
        .find({
          $and: [{ date: req.body.date }, { dealer_name1: req.body.dealer_Id }],
        })
        .populate("tank")
        .populate("name_of_dsm");
      console.log("msrecord............", hsdrecord);
      if (hsdrecord == null) {
        res.status(400).json({
          status: false,
          msg: "record not found",
        });
      }
      console.log("msrecord............", hsdrecord);
      let record = [];
      for (const element of hsdrecord) {
        if (product.toLowerCase() == "hsd") {
          console.log("element", element);
          record.push("dsm name:", element.name_of_dsm.dsm_name);
          record.push("hsd_sales:", element.hsd_sales);
          record.push("hsd_testing:", element.hsd_testing);
          record.push("hsd_own_use:", element.hsd_own_use);
        }
      }

      for (const i of hsdrecord) {
        if (product.toLowerCase() == "hsd") {
          hsd_sales.push(i.hsd_sales);
          hsd_testing.push(i.hsd_testing);
          hsd_own_use.push(i.hsd_own_use);
        }
      }

      console.log(hsd_sales);
      console.log(hsd_testing);
      console.log(hsd_own_use);
      let sumhsd_sales = _.sum(hsd_sales);
      console.log(sumhsd_sales);
      let sumhsd_testing = _.sum(hsd_testing);
      console.log(sumhsd_testing);
      let sumhsd_own_use = _.sum(hsd_own_use);
      console.log(sumhsd_own_use);
      let netsale = sumhsd_sales - sumhsd_testing - sumhsd_own_use;
      console.log("netsale", netsale);
      let netamt = rsphsd * (sumhsd_sales - sumhsd_testing - sumhsd_own_use);
      console.log("netamt", netamt);
      let data = {
        dealer_Id: dealer_Id,
        date: date,
        product: product,
        dsm: record,

        metersales_hsd: sumhsd_sales,
        ownuse_hsd: sumhsd_own_use,
        testing_hsd: sumhsd_testing,
        netslesltr_hsd: netsale,
        netsalesAmount_hsd: netamt,
      };
      res.status(200).json({
        status: true,
        data: data,
      });
    }
    ///Ms
    let ms_sales = [];
    let ms_testing = [];
    let ms_own_use = [];

    if (product.toLowerCase() == "ms") {
      let msrecord = await dsmclosing
        .find({
          $and: [{ date: req.body.date }, { dealer_name1: req.body.dealer_Id }],
        })
        .populate("tank")
        .populate("name_of_dsm");
      if (msrecord == null) {
        res.status(400).json({
          status: false,
          msg: "record not found",
        });
      }
      console.log("msrecord............", msrecord);
      let record = [];
      for (const element of msrecord) {
        if (product.toLowerCase() == "ms") {
          console.log("element", element);
          record.push("dsm name:", element.name_of_dsm.dsm_name);
          record.push("ms_sales:", element.ms_sales);
          record.push("ms_testing:", element.ms_testing);
          record.push("ms_own_use:", element.ms_own_use);
        }
      }
      for (const i of msrecord) {
        if (product.toLowerCase() == "ms") {
          ms_sales.push(i.ms_sales);
          ms_testing.push(i.ms_testing);
          ms_own_use.push(i.ms_own_use);
        }
      }

      console.log(ms_sales);
      console.log(ms_testing);
      console.log(ms_own_use);
      let summs_sales = _.sum(ms_sales);
      console.log(summs_sales);
      let summs_testing = _.sum(ms_testing);
      console.log(summs_testing);
      let summs_own_use = _.sum(ms_own_use);
      console.log(summs_own_use);
      let netsale = summs_sales - summs_testing - summs_own_use;
      console.log("netsale", netsale);
      let netamt = rspms * (summs_sales - summs_testing - summs_own_use);
      console.log("netamt", netamt);
      let data = {
        dealer_Id: dealer_Id,
        date: date,
        product: product,
        dsm: record,
        metersales_ms: summs_sales,
        testing_ms: summs_testing,
        ownuse_ms: summs_own_use,
        netslesltr_ms: netsale,
        netsalesAmount_ms: netamt,
      };
      res.status(200).json({
        status: true,
        data: data,
      });
    }

    ///both
    if (product.toLowerCase() == "both") {
      let bothrecord = await dsmclosing
        .find({
          $and: [{ date: req.body.date }, { dealer_name1: req.body.dealer_Id }],
        })
        .populate("tank")
        .populate("name_of_dsm");
      if (bothrecord == null) {
        res.status(400).json({
          status: false,
          msg: "record not found",
        });
      }
      console.log("msrecord............", bothrecord);
      let record = [];
      for (const element of bothrecord) {
        console.log("element", element);

        record.push("dsm name:", element.name_of_dsm.dsm_name);
        record.push("hsd_sales:", element.hsd_sales);
        record.push("hsd_testing:", element.hsd_testing);
        record.push("hsd_own_use:", element.hsd_own_use);
        record.push(element.ms_sales);
        record.push(element.ms_testing);
        record.push(element.ms_own_use);
      }
      for (const i of bothrecord) {
        ms_sales.push(i.ms_sales);
        ms_testing.push(i.ms_testing);
        ms_own_use.push(i.ms_own_use);
        hsd_sales.push(i.hsd_sales);
        hsd_testing.push(i.hsd_testing);
        hsd_own_use.push(i.hsd_own_use);
      }

      console.log(ms_sales);
      console.log(ms_testing);
      console.log(ms_own_use);
      let summs_sales = _.sum(ms_sales);
      console.log(summs_sales);
      let summs_testing = _.sum(ms_testing);
      console.log(summs_testing);
      let summs_own_use = _.sum(ms_own_use);
      console.log(summs_own_use);
      let netsalems = summs_sales - summs_testing - summs_own_use;
      console.log("netsalems", netsalems);
      let netamtms = rspms * (summs_sales - summs_testing - summs_own_use);
      console.log("netamtms", netamtms);

      ///hsd
      console.log(hsd_sales);
      console.log(hsd_testing);
      console.log(hsd_own_use);
      let sumhsd_sales = _.sum(hsd_sales);
      console.log(sumhsd_sales);
      let sumhsd_testing = _.sum(hsd_testing);
      console.log(sumhsd_testing);
      let sumhsd_own_use = _.sum(hsd_own_use);
      console.log(sumhsd_own_use);
      let netsalehsd = sumhsd_sales - sumhsd_testing - sumhsd_own_use;
      console.log("netsalehsd", netsalehsd);
      let netamthsd = rsphsd * (sumhsd_sales - sumhsd_testing - sumhsd_own_use);
      console.log("netamthsd", netamthsd);
      let data = {
        dealer_Id: dealer_Id,
        date: date,
        product: product,
        dsm: record,

        //ms
        metersales_ms: summs_sales,
        testing_ms: summs_testing,
        ownuse_ms: summs_own_use,
        netslesltr_ms: netsalems,
        netsalesAmount_ms: netamtms,
        //hsd
        metersales_hsd: sumhsd_sales,
        ownuse_hsd: sumhsd_own_use,
        testing_hsd: sumhsd_testing,
        netslesltr_hsd: netsalehsd,
        netsalesAmount_hsd: netamthsd,
      };
      res.status(400).json({
        status: true,
        data: data,
      });
    }
  }
};
