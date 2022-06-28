const FMotherEquipment = require("../models/FMotherEquipment");
const equpmentFm = require("../models/equpmentFm");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addequipment = async (req, res) => {
  const { dealer_Id, Equipment, Due_Date, Uplaod_Document, Remarks } = req.body;

  const newequipment = new FMotherEquipment({
    dealer_Id: dealer_Id,
    Equipment: Equipment,
    Due_Date: Due_Date,
    Uplaod_Document: Uplaod_Document,
    Remarks: Remarks,
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
      newequipment.Uplaod_Document = alluploads;
    }

    newequipment
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

exports.allequipment = async (req, res) => {
  console.log(res.params);
  await FMotherEquipment.find()
    .populate("Equipment")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allequipmentApp = async (req, res) => {
  console.log(res.params);
  await FMotherEquipment.find({ dealer_Id: req.params.dealer_Id })
    .populate("Equipment")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//consol
//find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

exports.getoneequipment = async (req, res) => {
  await FMotherEquipment.findOne({ _id: req.params.id })
    .populate("Equipment")
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteequipment = async (req, res) => {
  await FMotherEquipment.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateequipment = async (req, res) => {
  const { Equipment, Due_Date, Uplaod_Document, Remarks } = req.body;
  data = {};
  if (Equipment) {
    data.Equipment = Equipment;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }
  if (Remarks) {
    data.Remarks = Remarks;
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
      const findandUpdateEntry = await FMotherEquipment.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      )
        .populate("Equipment")
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
  }
};

exports.addequpmentFm = async (req, res) => {
  const { dealer_Id, Equipment, Due_Date, Uplaod_Document, Remarks } = req.body;

  const newequpmentFm = new equpmentFm({
    dealer_Id: dealer_Id,
    Equipment: Equipment,
    Due_Date: Due_Date,
    Uplaod_Document: Uplaod_Document,
    Remarks: Remarks,
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
      newequpmentFm.Uplaod_Document = alluploads;
    }

    newequpmentFm
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

exports.allequpmentFm = async (req, res) => {
  console.log(res.params);
  await equpmentFm
    .find()
    .populate("Equipment")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allequpmentFmApp = async (req, res) => {
  console.log(res.params);
  await equpmentFm
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("Equipment")
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//consol
//find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

exports.getoneequpmentFm = async (req, res) => {
  await equpmentFm
    .findOne({ _id: req.params.id })

    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteequpmentFm = async (req, res) => {
  await equpmentFm
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateequpmentFm = async (req, res) => {
  const { Equipment, Due_Date, Uplaod_Document, Remarks } = req.body;
  data = {};
  if (Equipment) {
    data.Equipment = Equipment;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }
  if (Remarks) {
    data.Remarks = Remarks;
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
      const findandUpdateEntry = await equpmentFm
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          { $set: data },
          { new: true }
        )
        .populate("Equipment")
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
  }
};
