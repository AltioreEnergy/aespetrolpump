const staffrom = require("../models/stafform");
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

exports.addstaff = async (req, res) => {
  const {
    dealer_Id,
    staff_name,
    password,
    addres,
    mobile,
    joining_date,
    adhar_number,
    adharimg,
    pan_number,
    panImg,
    photograh,
    date_of_brith,
    salary_decieded,
    salary_date,

    apprpved_leave,
    status,
  } = req.body;

  const newstaffaddfrom = new staffrom({
    dealer_Id: dealer_Id,
    staff_name: staff_name,
    password: password,
    addres: addres,
    mobile: mobile,
    joining_date: joining_date,
    adhar_number: adhar_number,
    pan_number: pan_number,
    panImg: panImg,
    photograh: photograh,
    date_of_brith: date_of_brith,
    salary_decieded: salary_decieded,
    salary_date: salary_date,
    apprpved_leave: apprpved_leave,
    status: status,
  });
  const findexist = await staffrom.findOne({ mobile: mobile });
  if (findexist) {
    resp.alreadyr(res, "staff");
  } else if (req.files) {
    if (req.files.panImg) {
      alluploads = [];
      for (let i = 0; i < req.files.panImg.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.panImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.panImg[i].path);
        alluploads.push(resp.secure_url);
      }
      newstaffaddfrom.panImg = alluploads;
    }

    if (req.files.photograh) {
      photograph_arry = [];
      for (let i = 0; i < req.files.photograh.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.photograh[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {}
        );
        fs.unlinkSync(req.files.photograh[i].path);
        photograph_arry.push(resp.secure_url);
      }
      newstaffaddfrom.photograh = photograph_arry;
    }

    if (req.files.adharimg) {
      adharimg_Array = [];
      for (let i = 0; i < req.files.adharimg.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.adharimg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adharimg[i].path);
        adharimg_Array.push(resp.secure_url);
      }
      newstaffaddfrom.adharimg = adharimg_Array;
    }

    newstaffaddfrom
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};
exports.allstaff = async (req, res) => {
  await staffrom
    .find()
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allstaffApp = async (req, res) => {
  await staffrom
    .find({ $and: [{dealer_Id: req.params.dealer_Id },{status:"Active"}]})
    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonestaff = async (req, res) => {
  await staffrom
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletestaff = async (req, res) => {
  await staffrom
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateonestaff = async (req, res) => {
  const {
    dealer_Id,
    staff_name,
    password,
    addres,
    mobile,
    joining_date,
    adhar_number,
    pan_number,
    panImg,
    photograh,
    date_of_brith,
    salary_decieded,
    salary_date,
    any_other_facility,
    apprpved_leave,
    status,
    shiftManagment,
    stockManagment,
    cashManagment,
    facilityManagment,
    roconfiguration,
  } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (staff_name) {
    data.staff_name = staff_name;
  }
  if (password) {
    data.password = password;
  }
  if (addres) {
    data.addres = addres;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (joining_date) {
    data.joining_date = joining_date;
  }
  if (adhar_number) {
    data.adhar_number = adhar_number;
  }

  if (pan_number) {
    data.pan_number = pan_number;
  }
  if (date_of_brith) {
    data.date_of_brith = date_of_brith;
  }
  if (salary_decieded) {
    data.salary_decieded = salary_decieded;
  }

  if (salary_date) {
    data.salary_date = salary_date;
  }
  if (status) {
    data.status = status;
  }
  if (apprpved_leave) {
    data.apprpved_leave = apprpved_leave;
  }
  if (any_other_facility) {
    data.any_other_facility = any_other_facility;
  }
  if (shiftManagment) {
    data.shiftManagment = shiftManagment;
  }
  if (stockManagment) {
    data.stockManagment = stockManagment;
  }
  if (cashManagment) {
    data.cashManagment = cashManagment;
  }
  if (facilityManagment) {
    data.facilityManagment = facilityManagment;
  }
  if (roconfiguration) {
    data.roconfiguration = roconfiguration;
  }
  if (req.files) {
    if (req.files.panImg) {
      alluploads = [];
      for (let i = 0; i < req.files.panImg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.panImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.panImg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.panImg = alluploads;
    }
    if (req.files) {
      if (req.files.photograh) {
        alluploads = [];
        for (let i = 0; i < req.files.photograh.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(
            req.files.photograh[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.photograh[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.photograh = alluploads;
      }
      if (req.files) {
        if (req.files.adharimg) {
          alluploads = [];
          for (let i = 0; i < req.files.adharimg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(
              req.files.adharimg[i].path,
              { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.adharimg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.adharimg = alluploads;
        }
      }
      if (data) {
        const findandUpdateEntry = await staffrom
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
    }
  }
};
exports.totaloutherstaff = async (req, res) => {
  await staffrom
    .countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//console.log()
