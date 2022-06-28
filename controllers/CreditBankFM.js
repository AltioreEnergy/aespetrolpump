const CreditBankFM = require("../models/CreditBankFM");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addCreditBankFM = async (req, res) => {
  const {
    dealer_Id,
    bank,
    Sanctioned_Amount,
    Uplaod_Document,
    Remarks,
    Interest_Rate,
    Type_of_Loan,
  } = req.body;

  const neweCreditBankFM = new CreditBankFM({
    dealer_Id: dealer_Id,
    bank: bank,
    Sanctioned_Amount: Sanctioned_Amount,
    Uplaod_Document: Uplaod_Document,
    Remarks: Remarks,
    Interest_Rate: Interest_Rate,
    Type_of_Loan: Type_of_Loan,
  });
  if (req.files) {
    if (req.files.Uplaod_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Uplaod_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Uplaod_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Uplaod_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      neweCreditBankFM.Uplaod_Document = alluploads;
    }

    neweCreditBankFM
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
  } else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
};

exports.allCreditBankFM = async (req, res) => {
  console.log(res.params);
  await CreditBankFM.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "bank",
      select: "name_of_bank",
    })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allCreditBankFMApp = async (req, res) => {
  console.log(res.params);
  await CreditBankFM.find({ dealer_Id: req.params.dealer_Id })
    .sort({ createdAt: -1 })
    .populate({
      path: "bank",
      select: "name_of_bank",
    })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneCreditBankFM = async (req, res) => {
  await CreditBankFM.findOne({ _id: req.params.id })
    .populate({
      path: "bank",
      select: "name_of_bank",
    })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteCreditBankFM = async (req, res) => {
  await CreditBankFM.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateCreditBankFM = async (req, res) => {
  const {
    bank,
    Sanctioned_Amount,
    Uplaod_Document,
    Remarks,
    Interest_Rate,
    Type_of_Loan,
  } = req.body;
  data = {};
  if (bank) {
    data.bank = bank;
  }
  if (Sanctioned_Amount) {
    data.Sanctioned_Amount = Sanctioned_Amount;
  }
  if (Remarks) {
    data.Remarks = Remarks;
  }
  if (Interest_Rate) {
    data.Interest_Rate = Interest_Rate;
  }

  if (Type_of_Loan) {
    data.Type_of_Loan = Type_of_Loan;
  }

  if (req.files) {
    if (req.files.Uplaod_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Uplaod_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Uplaod_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Uplaod_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Uplaod_Document = alluploads;
    }
    if (data) {
      const findandUpdateEntry = await CreditBankFM.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      ).populate({
        path: "bank",
        select: "name_of_bank",
      });

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
  }
};
