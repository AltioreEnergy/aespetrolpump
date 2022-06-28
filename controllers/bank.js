const Bank = require("../models/bank");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
exports.addbank = async (req, res) => {
  const {
    dealer_name1,
    name_of_bank,
    credit_limit_of_bank,
    intrest_rates,
    account_no,
    ifsc_code,
    cresit_offer,
    document_upload
  } = req.body;

  const newbank = new Bank({
    dealer_name1: dealer_name1,
    name_of_bank: name_of_bank,
    credit_limit_of_bank: credit_limit_of_bank,
    intrest_rates: intrest_rates,
    account_no: account_no,
    ifsc_code: ifsc_code,
    cresit_offer: cresit_offer,
    document_upload: document_upload
  });

  if (req.files.document_upload) {
    alluploads = [];
    for (let i = 0; i < req.files.document_upload.length; i++) {
      const resp = await cloudinary.uploader.upload(
        req.files.document_upload[i].path,
        { use_filename: true, unique_filename: false }
      );
      fs.unlinkSync(req.files.document_upload[i].path);
      alluploads.push(resp.secure_url);
    }
    newbank.document_upload = alluploads;
  }


  newbank
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


exports.allbank = async (req, res) => {
  //await Bank.remove();
  await Bank
    .find().sort({ createdAt: -1 }).populate('dealer_name1')
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allbankApp = async (req, res) => {
  //await Bank.remove();
  await Bank
    .find({dealer_name1:req.params.dealer_name1}).sort({ createdAt: -1 }).populate('dealer_name1')
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getonebank = async (req, res) => {
  await Bank
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletebank = async (req, res) => {
  await Bank.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.updateonebank = async (req, res) => {
  const {
    dealer_name1,
    name_of_bank,
    credit_limit_of_bank,
    intrest_rates,
    account_no,
    ifsc_code,
    cresit_offer,
    document_upload
  } = req.body;
  data = {};
  if (dealer_name1) {
    data.dealer_name1 = dealer_name1;
  }
  if (name_of_bank) {
    data.name_of_bank = name_of_bank;
  }
  if (credit_limit_of_bank) {
    data.credit_limit_of_bank = credit_limit_of_bank;
  }
  if (intrest_rates) {
    data.intrest_rates = intrest_rates;
  }
  if (account_no) {
    data.account_no = account_no;
  }

  if (ifsc_code) {
    data.ifsc_code = ifsc_code;
  }
  if (cresit_offer) {
    data.cresit_offer = cresit_offer;
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
    const findandUpdateEntry = await Bank.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );

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

