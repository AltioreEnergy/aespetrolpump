const bankDeposits = require("../models/bankDeposits");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.addbankDeposits = async (req, res) => {
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("Receipt", de);
  const {
    dealer_Id,
    date,
    Opening_Balance,
    Deposited_today,
    Expense_today,
    Clsosing_Balance_Expected,
    Remarks,
    document_upload,
    Dealers_Concurrence,
  } = req.body;

  const newbankDeposits = new bankDeposits({
    dealer_Id: dealer_Id,
    date: de,
    Opening_Balance: Opening_Balance,
    Deposited_today: Deposited_today,
    Expense_today: Expense_today,
    Clsosing_Balance_Expected: Clsosing_Balance_Expected,
    Remarks: Remarks,
    document_upload: document_upload,

    Dealers_Concurrence: Dealers_Concurrence,
  });
  if (req.files) {
    if (req.files.document_upload[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.document_upload.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.document_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.document_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      newbankDeposits.document_upload = alluploads;
    }
  }
  newbankDeposits
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
exports.allbankDeposits = async (req, res) => {
  await bankDeposits
    .find()
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    //.populate('dealer_name1')
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allbankDepositsApp = async (req, res) => {
  await bankDeposits
    .find({ dealer_Id: req.params.dealer_Id })
    .sort({ createdAt: -1 })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonebankDeposits = async (req, res) => {
  await bankDeposits
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletebankDeposits = async (req, res) => {
  await bankDeposits
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonebankDeposits = async (req, res) => {
  console.log(req.params.id);
  const {
    dealer_Id,
    date,
    Opening_Balance,
    Deposited_today,
    Expense_today,
    Clsosing_Balance_Expected,
    Remarks,
    document_upload,
    Dealers_Concurrence,
  } = req.body;
  data = {};
  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Opening_Balance) {
    data.Opening_Balance = Opening_Balance;
  }
  if (Deposited_today) {
    data.Deposited_today = Deposited_today;
  }
  if (Expense_today) {
    data.Expense_today = Expense_today;
  }
  if (Clsosing_Balance_Expected) {
    data.Clsosing_Balance_Expected = Clsosing_Balance_Expected;
  }
  if (Remarks) {
    data.Remarks = Remarks;
  }
  if (Dealers_Concurrence) {
    data.Dealers_Concurrence = Dealers_Concurrence;
  }

  if (req.files) {
    if (req.files.document_upload) {
      alluploads = [];
      for (let i = 0; i < req.files.document_upload.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.document_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.document_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.document_upload = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await bankDeposits
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      )
      .populate("dealer_Id");

    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
};
