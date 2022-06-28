const resp = require("../helpers/apiresponse");
const creditgiven = require("../models/creditgivento");
const creditcustomers = require("../models/creditcustomers");
const Creditcustomers = require("../models/creditcustomers");
const RSP = require("../models/rsp");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addcreditgiven = async (req, res) => {
  const {
    dealer_Id,
    date,
    name_of_customer,
    vehicle_no,
    credit_for,
    credit_available,
    credit_limit,
    payment_overdue_as_on_date,
    credit_given_today_amount,
    dsm_name,
    credit_setalment,
    creditToday,
  } = req.body;
  //date
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  console.log(rsp);
  // let rs1 = rsp.rsp1;
  // let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log(de);
  //vehicle no
  let vn = await Creditcustomers.findOne({ _id: req.body.name_of_customer });
  let vhNO = vn.vehicle_no;
  let creditlimit = vn.credit_limit;
  let overdueful = vn.credit_term_Fuel;
  let overduelub = vn.credit_term_lube;
  let overdue = 0;
  if (req.body.credit_for == "lube") {
    overdue = overduelub;
  } else {
    overdue = overdueful;
  }
  const newcreditgiven = new creditgiven({
    dealer_Id: dealer_Id,
    date: de,
    name_of_customer: name_of_customer,
    vehicle_no: vhNO,
    credit_for: credit_for,
    credit_available: creditlimit - credit_given_today_amount,
    credit_limit: creditlimit,
    payment_overdue_as_on_date: overdue,
    credit_given_today_amount: credit_given_today_amount,
    dsm_name: dsm_name,
    credit_setalment: credit_setalment,
    creditToday: credit_given_today_amount - credit_setalment,
  });
  //console.log(net_cash);

  newcreditgiven
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

exports.searchnameCoustomer = async (req, res) => {
  const { oneinput } = req.body;
  const findall = await creditcustomers.find({
    name_of_customer: { $regex: oneinput, $options: "i" },
  });

  if (findall) {
    let somearray = [];
    findall.forEach((i) => {
      somearray.indexOf(i.name_of_customer) === -1
        ? somearray.push(i.name_of_customer)
        : console.log("already exists");
      //console.log(i)
    });
    console.log(somearray);

    let getname = async () => {
      await Creditcustomers.find({ name_of_customer: { $in: somearray } }).then(
        (data1) => {
          res.status(200).json({
            status: true,
            data: data1,
          });
        }
      );
    };
    getname();

    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.searchvhicalCoustomer = async (req, res) => {
  const { oneinput } = req.body;
  const findall = await Creditcustomers.find({
    vehicle_no: { $regex: oneinput, $options: "i" },
  });

  if (findall) {
    let somearray = [];
    findall.forEach((i) => {
      somearray.indexOf(i.vehicle_no) === -1
        ? somearray.push(i.vehicle_no)
        : console.log("already exists");
      //console.log(i)
    });
    console.log(somearray);

    let getvehicle_no = async () => {
      await Creditcustomers.find({ vehicle_no: { $in: somearray } }).then(
        (data1) => {
          res.status(200).json({
            status: true,
            data: data1,
          });
        }
      );
    };
    getvehicle_no();

    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.allcreditgiven = async (req, res) => {
  await creditgiven
    .find()
    .sort({ createdAt: -1 })
    .populate("dealer_Id")
    .populate("name_of_customer")
    .populate("dsm_name")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcreditgivenApp = async (req, res) => {
  await creditgiven
    .find({ dealer_Id: req.params.dealer_Id })
    .sort({ createdAt: -1 })
    .populate("dealer_Id")
    .populate("name_of_customer")
    .populate("dsm_name")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonecreditgiven = async (req, res) => {
  await creditgiven
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .populate("name_of_customer")
    .populate("dsm_name")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecreditgiven = async (req, res) => {
  await creditgiven
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecreditgiven = async (req, res) => {
  console.log(req.params.id);
  await creditgiven

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
    .populate("dealer_name1")
    .populate("name_of_customer")
    .populate("dsm_name")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};
exports.allcreditManagmentApp = async (req, res) => {
  await creditgiven
    .find({ dealer_Id: req.params.dealer_Id })
    .sort({ createdAt: -1 })
    .populate("dealer_Id")
    .populate("name_of_customer")
    .populate("dsm_name")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
