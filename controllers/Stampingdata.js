const Stampingdata = require("../models/Stampingdata");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addStampingdata = async (req, res) => {
  const {
    dealer_Id,
    MPD,
    nozzel,
    Product,
    Last_Stamping_Date,
    Due_Date,
    K_Factor,
    Upload_Certificate,
    Upload_Service_Report,
    Last_Service_Date,
    Last_Service_Report,
  } = req.body;

  const newStampingdata = new Stampingdata({
    dealer_Id: dealer_Id,
    MPD: MPD,
    nozzel: nozzel,
    Product: Product,
    Last_Stamping_Date: Last_Stamping_Date,
    Due_Date: Due_Date,
    K_Factor: K_Factor,
    Upload_Certificate: Upload_Certificate,
    Upload_Service_Report: Upload_Service_Report,
    Last_Service_Date: Last_Service_Date,
    Last_Service_Report: Last_Service_Report,
  });
  if (req.files) {
    if (req.files.Upload_Certificate) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Certificate.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Certificate[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Certificate[i].path);
        alluploads.push(resp.secure_url);
      }
      newStampingdata.Upload_Certificate = alluploads;
    }

    if (req.files.Upload_Service_Report) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Service_Report.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Service_Report[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Service_Report[i].path);
        alluploads.push(resp.secure_url);
      }
      newStampingdata.Upload_Service_Report = alluploads;
    }
    if (req.files.Last_Service_Report) {
      alluploads = [];
      for (let i = 0; i < req.files.Last_Service_Report.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Last_Service_Report[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Last_Service_Report[i].path);
        alluploads.push(resp.secure_url);
      }
      newStampingdata.Last_Service_Report = alluploads;
    }

    newStampingdata
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

exports.allStampingdata = async (req, res) => {
  await Stampingdata.find()
    .populate([
      {
        path: "MPD",
        select: "mpd",
      },
    ])
    .populate([
      {
        path: "nozzel",
        select: "nozzle",
      },
    ])
    .populate([
      {
        path: "Product",
        select: "Product",
      },
    ])
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allStampingdataApp = async (req, res) => {
  await Stampingdata.find({ dealer_Id: req.params.dealer_Id })
    .populate([
      {
        path: "MPD",
        select: "mpd",
      },
    ])
    .populate([
      {
        path: "nozzel",
        select: "nozzle",
      },
    ])
    .populate([
      {
        path: "Product",
        select: "Product",
      },
    ])
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteStampingdata = async (req, res) => {
  await Stampingdata.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneStampingdata = async (req, res) => {
  await Stampingdata.findOne({ _id: req.params.id })
    .populate([
      {
        path: "MPD",
        select: "mpd",
      },
    ])
    .populate([
      {
        path: "nozzel",
        select: "nozzle",
      },
    ])
    .populate([
      {
        path: "Product",
        select: "product",
      },
    ])
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.updateStampingdata = async (req, res) => {
  const {
    MPD,
    nozzel,
    Product,
    Last_Stamping_Date,
    Due_Date,
    K_Factor,
    Upload_Certificate,
    Upload_Service_Report,
    Last_Service_Date,
    Last_Service_Report,
  } = req.body;
  data = {};
  if (MPD) {
    data.MPD = MPD;
  }
  if (nozzel) {
    data.nozzel = nozzel;
  }
  if (Product) {
    data.Product = Product;
  }
  if (Last_Stamping_Date) {
    data.Last_Stamping_Date = Last_Stamping_Date;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }

  if (K_Factor) {
    data.K_Factor = K_Factor;
  }
  if (Last_Service_Date) {
    data.Last_Service_Date = Last_Service_Date;
  }

  if (req.files) {
    if (req.files.Upload_Certificate) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Certificate.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Certificate[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Certificate[i].path);
        alluploads.push(resp.secure_url);
      }
      data.Upload_Certificate = alluploads;
    }

    if (req.files.Upload_Service_Report) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Service_Report.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Service_Report[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Service_Report[i].path);
        alluploads.push(resp.secure_url);
      }
      data.Upload_Service_Report = alluploads;
    }
    if (req.files.Last_Service_Report) {
      alluploads = [];
      for (let i = 0; i < req.files.Last_Service_Report.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Last_Service_Report[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Last_Service_Report[i].path);
        alluploads.push(resp.secure_url);
      }
      data.Last_Service_Report = alluploads;
    }

    if (data) {
      const findandUpdateEntry = await Stampingdata.findOneAndUpdate(
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
  }
};
