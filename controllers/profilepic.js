const Profilepic = require("../models/profilepic");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addprofilepic = async (req, res) => {
  const { dealer_id, profilepic } = req.body;

  const newProfilepic = new Profilepic({
    dealer_id: dealer_id,
    profilepic: profilepic,
  });
  if (req.files) {
    if (req.files.profilepic[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.profilepic.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.profilepic[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.profilepic[i].path);
        alluploads.push(resp.secure_url);
      }
      newProfilepic.profilepic = alluploads;
    }
  }
  newProfilepic
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allprofilepic = async (req, res) => {
  console.log(res.params);
  await Profilepic.find()
    .populate("dealer_id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateprofilepic = async (req, res) => {
  const { dealer_id, profilepic } = req.body;
  data = {};
  if (dealer_id) {
    data.dealer_id = dealer_id;
  }
  if (req.files) {
    if (req.files.profilepic) {
      alluploads = [];
      for (let i = 0; i < req.files.profilepic.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.profilepic[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.profilepic[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.profilepic = alluploads;
    }
    if (data) {
      const findandUpdateEntry = await Profilepic.findOneAndUpdate(
        {
          dealer_id: req.params.id,
        },
        { $set: data },
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
};

exports.viewonepic = async (req, res) => {
  const findone = await Profilepic.findOne({ dealer_id: req.params.id });
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
