const Receipt = require("../models/product_receipt ");
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
exports.addReceipt = async (req, res) => {
  const {
    dealer_Id,
    date,
    Invoice_No,
    Tank_Lorry_No,
    Total_Invoice_Value,
    VAT_MS,
    VAT_HSD,
    TCS_LFR_MS,
    TCS_LFR_HSD,
    Champer_details,
    Product,
    Capacity,
    Density_As_per_Invoice,
    Density_Room_temp_obs,
    Room_Temp,
    Density_Observed_at_15_c,
    Difference,
    PL_as_per_Invoice,
    DL_as_per_Invoice,
    X,
    Y,
    Pl_Observed,
    DL_Observed,
    X_obs,
    Y_obs,
    Loss_to_be_booked,
    Upload_of_signed_copy_of_Invoice,
  } = req.body;

  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("Receipt", de);
  const newreceipt = new Receipt({
    dealer_Id: dealer_Id,
    date: de,
    Invoice_No: Invoice_No,
    Tank_Lorry_No,
    Total_Invoice_Value,
    VAT_MS: VAT_MS,
    VAT_HSD: VAT_HSD,
    TCS_LFR_MS: TCS_LFR_MS,
    TCS_LFR_HSD: TCS_LFR_HSD,
    Champer_details: Champer_details,
    Product: Product,
    Capacity: Capacity,
    Density_As_per_Invoice: Density_As_per_Invoice,
    Density_Room_temp_obs: Density_Room_temp_obs,
    Room_Temp: Room_Temp,
    Density_Observed_at_15_c: Density_Observed_at_15_c,
    Difference: Density_Observed_at_15_c - Room_Temp,
    PL_as_per_Invoice: PL_as_per_Invoice,
    DL_as_per_Invoice: DL_as_per_Invoice,
    X: X,
    Y: Y,
    Pl_Observed: Pl_Observed,
    DL_Observed: DL_Observed,
    X_obs: X_obs,
    Y_obs: Y_obs,
    Loss_to_be_booked: Loss_to_be_booked,
    Upload_of_signed_copy_of_Invoice: Upload_of_signed_copy_of_Invoice,
  });
  if (req.files) {
    if (req.files.Upload_of_signed_copy_of_Invoice[0].path) {
      alluploads = [];
      for (
        let i = 0;
        i < req.files.Upload_of_signed_copy_of_Invoice.length;
        i++
      ) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_of_signed_copy_of_Invoice[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_of_signed_copy_of_Invoice[i].path);
        alluploads.push(resp.secure_url);
      }
      newreceipt.Upload_of_signed_copy_of_Invoice = alluploads;
    }

    newreceipt
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
exports.allReceipt = async (req, res) => {
  await Receipt.find()
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allReceiptApp = async (req, res) => {
  await Receipt.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneReceipt = async (req, res) => {
  await Receipt.findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteReceipt = async (req, res) => {
  await Receipt.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateReceipt = async (req, res) => {
  const {
    dealer_Id,
    date,
    Invoice_No,
    Tank_Lorry_No,
    Total_Invoice_Value,
    VAT_MS,
    VAT_HSD,
    TCS_LFR_MS,
    TCS_LFR_HSD,
    Champer_details,
    Product,
    Capacity,
    Density_As_per_Invoice,
    Density_Room_temp_obs,
    Room_Temp,
    Density_Observed_at_15_c,
    Difference,
    PL_as_per_Invoice,
    DL_as_per_Invoice,
    X,
    Y,
    Pl_Observed,
    DL_Observed,
    X_obs,
    Y_obs,
    Loss_to_be_booked,
    Upload_of_signed_copy_of_Invoice,
  } = req.body;
  data = {};

  if (Invoice_No) {
    data.Invoice_No = Invoice_No;
  }
  if (Tank_Lorry_No) {
    data.Tank_Lorry_No = Tank_Lorry_No;
  }
  if (Total_Invoice_Value) {
    data.Total_Invoice_Value = Total_Invoice_Value;
  }
  if (VAT_MS) {
    data.VAT_MS = VAT_MS;
  }
  if (VAT_HSD) {
    data.VAT_HSD = VAT_HSD;
  }
  if (TCS_LFR_MS) {
    data.TCS_LFR_MS = TCS_LFR_MS;
  }

  if (TCS_LFR_HSD) {
    data.TCS_LFR_HSD = TCS_LFR_HSD;
  }
  if (Champer_details) {
    data.Champer_details = Champer_details;
  }
  if (Product) {
    data.Product = Product;
  }

  if (Capacity) {
    data.Capacity = Capacity;
  }
  if (Density_As_per_Invoice) {
    data.Density_As_per_Invoice = Density_As_per_Invoice;
  }
  if (Density_Room_temp_obs) {
    data.Density_Room_temp_obs = Density_Room_temp_obs;
  }
  if (Room_Temp) {
    data.Room_Temp = Room_Temp;
  }
  if (Density_Observed_at_15_c) {
    data.Density_Observed_at_15_c = Density_Observed_at_15_c;
  }
  if (Difference) {
    data.Difference = Difference;
  }
  if (Room_Temp) {
    data.Room_Temp = Room_Temp;
  }
  if (PL_as_per_Invoice) {
    data.PL_as_per_Invoice = PL_as_per_Invoice;
  }
  if (DL_as_per_Invoice) {
    data.DL_as_per_Invoice = DL_as_per_Invoice;
  }
  if (X) {
    data.X = X;
  }
  if (Y) {
    data.Y = Y;
  }
  if (Pl_Observed) {
    data.Pl_Observed = Pl_Observed;
  }

  if (req.files) {
    if (req.files.Upload_of_signed_copy_of_Invoice) {
      alluploads = [];
      for (
        let i = 0;
        i < req.files.Upload_of_signed_copy_of_Invoice.length;
        i++
      ) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_of_signed_copy_of_Invoice[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_of_signed_copy_of_Invoice[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_of_signed_copy_of_Invoice = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await Receipt.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
      { new: true }
    ).populate("dealer_Id");

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
