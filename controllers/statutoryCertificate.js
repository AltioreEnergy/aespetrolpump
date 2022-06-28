const statutoryCertificate = require("../models/statutoryCertificate");
const can5lFM = require("../models/can5lFM");
const thermometerFM = require("../models/thermometerFM");
const hydrometerFM = require("../models/hydrometerFM");
const PESO_FM = require("../models/PESO_FM");
const air_Gauage = require("../models/air_Gauage");
const DPSL = require("../models/DPSL ");
const outher_document = require("../models/outher_document");
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

exports.addstatutoryCertificate = async (req, res) => {
  const {
    Due_Date_of_Stamping,
    Upload_5l,
    Class_A,
    Class_B,
    Due_Date_of_PESO,
    Upload_PESO,
    scale,
    Hydrometer_Due_Date,
    Upload_Hydrometer,
    calibration_Due_date,
    uplodad_thermameter,
    due_date_air_gauage,
    uplodad_air_gauage,
    DPSL_upload,
    due_date_DPSL,
    due_date_outher,
    Remarks,
    upload_outher,
  } = req.body;

  const newstatutoryCertificate = new statutoryCertificate({
    Due_Date_of_Stamping: Due_Date_of_Stamping,
    Upload_5l: Upload_5l,
    Class_A: Class_A,
    Class_B: Class_B,
    Due_Date_of_PESO: Due_Date_of_PESO,
    Upload_PESO: Upload_PESO,
    scale: scale,
    Hydrometer_Due_Date: Hydrometer_Due_Date,
    Upload_Hydrometer: Upload_Hydrometer,
    calibration_Due_date: calibration_Due_date,
    uplodad_thermameter: uplodad_thermameter,
    due_date_air_gauage: due_date_air_gauage,
    uplodad_air_gauage: uplodad_air_gauage,
    DPSL_upload: DPSL_upload,
    due_date_DPSL: due_date_DPSL,
    due_date_outher: due_date_outher,

    upload_outher: upload_outher,
    Remarks: Remarks,
  });
  if (req.files) {
    // if (req.files.Upload_PESO[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.Upload_PESO.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.Upload_PESO[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.Upload_PESO[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.Upload_PESO = alluploads;
    // }

    // console.log("req.files.photograh", req.files.photograh)
    if (req.files.Upload_5l[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_5l.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_5l[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_5l[i].path);
        alluploads.push(resp.secure_url);
      }
      newstatutoryCertificate.Upload_5l = alluploads;
    }

    // if (req.files.Upload_Hydrometer[0].path) {
    //   Hydrometer = [];
    //   for (let i = 0; i < req.files.Upload_Hydrometer.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.Upload_Hydrometer[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.Upload_Hydrometer[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.Upload_Hydrometer = Hydrometer;
    // }

    // if (req.files.uplodad_thermameter[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.uplodad_thermameter.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.uplodad_thermameter[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.uplodad_thermameter[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.uplodad_thermameter = alluploads;
    // }

    // if (req.files.DPSL_upload[0].path) {
    //   alluploads = [];
    //   for (let i = 0; i < req.files.DPSL_upload.length; i++) {
    //     const resp = await cloudinary.uploader.upload(
    //       req.files.DPSL_upload[i].path,
    //       { use_filename: true, unique_filename: false }
    //     );
    //     fs.unlinkSync(req.files.DPSL_upload[i].path);
    //     alluploads.push(resp.secure_url);
    //   }
    //   newstatutoryCertificate.DPSL_upload = alluploads;
    // }

    if (req.files.upload_outher[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.upload_outher.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.upload_outher[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.upload_outher[i].path);
        alluploads.push(resp.secure_url);
      }
      newstatutoryCertificate.upload_outher = alluploads;
    }

    const newcan5lFM = new can5lFM({
      Due_Date_of_Stamping: Due_Date_of_Stamping,
      Upload_5l: Upload_5l,
    });
    if (req.files) {
      if (req.files.Upload_5l[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.Upload_5l.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.Upload_5l[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.Upload_5l[i].path);
          alluploads.push(resp.secure_url);
        }
        newcan5lFM.Upload_5l = alluploads;
      }
      newcan5lFM
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
  }
};
///can5lFM
exports.addcan5lFM = async (req, res) => {
  const { dealer_Id, Due_Date_of_Stamping, Upload_Document } = req.body;
  const newcan5lFM = new can5lFM({
    dealer_Id: dealer_Id,
    Due_Date_of_Stamping: Due_Date_of_Stamping,
    Upload_Document: Upload_Document,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newcan5lFM.Upload_Document = alluploads;
    }
    newcan5lFM
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

exports.allcan5lFM = async (req, res) => {
  await can5lFM
    .find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcan5lFMApp = async (req, res) => {
  await can5lFM
    .find({ dealer_Id: req.params.dealer_Id })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonecan5lFMApp = async (req, res) => {
  await can5lFM
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecan5lFM = async (req, res) => {
  await can5lFM
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecan5lFM = async (req, res) => {
  const { dealer_Id, Due_Date_of_Stamping, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date_of_Stamping) {
    data.Due_Date_of_Stamping = Due_Date_of_Stamping;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await can5lFM
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

/////PESO_FM

exports.addPESO_FM = async (req, res) => {
  const { dealer_Id, Class, Due_Date_of_Stamping, Upload_Document } = req.body;
  const newPESO_FM = new PESO_FM({
    dealer_Id: dealer_Id,
    Class: Class,
    Due_Date_of_Stamping: Due_Date_of_Stamping,
    Upload_Document: Upload_Document,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newPESO_FM.Upload_Document = alluploads;
    }
    newPESO_FM
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

exports.allPESO_FM = async (req, res) => {
  await PESO_FM.find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allPESO_FMApp = async (req, res) => {
  await PESO_FM.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonePESO_FM = async (req, res) => {
  await PESO_FM.findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatePESO_FM = async (req, res) => {
  const { dealer_Id, Class, Due_Date_of_Stamping, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date_of_Stamping) {
    data.Due_Date_of_Stamping = Due_Date_of_Stamping;
  }
  if (Class) {
    data.Class = Class;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await PESO_FM.findOneAndUpdate(
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

exports.deletePESO_FM = async (req, res) => {
  await PESO_FM.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
/// hydrometerFM

exports.addhydrometerFM = async (req, res) => {
  const { dealer_Id, scale, calibration_Due_Date, Upload_Document } = req.body;
  const newhydrometerFM = new hydrometerFM({
    dealer_Id: dealer_Id,
    scale: scale,
    calibration_Due_Date: calibration_Due_Date,
    Upload_Document: Upload_Document,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newhydrometerFM.Upload_Document = alluploads;
    }
    newhydrometerFM
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

exports.allhydrometerFM = async (req, res) => {
  await hydrometerFM
    .find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allhydrometerFMApp = async (req, res) => {
  await hydrometerFM
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatehydrometerFM = async (req, res) => {
  const { dealer_Id, Due_Date_of_Stamping, scale, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date_of_Stamping) {
    data.Due_Date_of_Stamping = Due_Date_of_Stamping;
  }

  if (scale) {
    data.scale = scale;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await hydrometerFM
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

exports.getonehydrometerFM = async (req, res) => {
  await hydrometerFM
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletehydrometerFM = async (req, res) => {
  await hydrometerFM
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
///thermometerFM

exports.addthermometerFM = async (req, res) => {
  const {
    dealer_Id,
    calibration_Due_Date,
    Upload_Document,
    Upload_certificate,
  } = req.body;
  const newthermometerFM = new thermometerFM({
    dealer_Id: dealer_Id,

    calibration_Due_Date: calibration_Due_Date,
    Upload_Document: Upload_Document,
    Upload_certificate: Upload_certificate,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newthermometerFM.Upload_Document = alluploads;
    }
    if (req.files.Upload_certificate[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_certificate.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_certificate[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_certificate[i].path);
        alluploads.push(resp.secure_url);
      }
      newthermometerFM.Upload_certificate = alluploads;
    }
    newthermometerFM
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

exports.allthermometerFM = async (req, res) => {
  await thermometerFM
    .find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allthermometerFMApp = async (req, res) => {
  await thermometerFM
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatethermometerFM = async (req, res) => {
  const { dealer_Id, Due_Date_of_Stamping, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date_of_Stamping) {
    data.Due_Date_of_Stamping = Due_Date_of_Stamping;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
    if (req.files.Upload_certificate) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_certificate.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_certificate[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_certificate[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_certificate = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await thermometerFM
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

exports.getonethermometerFM = async (req, res) => {
  await thermometerFM
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletethermometerFM = async (req, res) => {
  await thermometerFM
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
/////air_Gauage

exports.addair_Gauage = async (req, res) => {
  const { dealer_Id, Due_Date_of_calibration, Upload_Document } = req.body;
  const newair_Gauage = new air_Gauage({
    dealer_Id: dealer_Id,

    Due_Date_of_calibration: Due_Date_of_calibration,
    Upload_Document: Upload_Document,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newair_Gauage.Upload_Document = alluploads;
    }
    newair_Gauage
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

exports.allair_Gauage = async (req, res) => {
  await air_Gauage
    .find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allair_GauageApp = async (req, res) => {
  await air_Gauage
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateair_Gauage = async (req, res) => {
  const { dealer_Id, Due_Date_of_calibration, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date_of_calibration) {
    data.Due_Date_of_calibration = Due_Date_of_calibration;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await air_Gauage
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

exports.getoneair_Gauage = async (req, res) => {
  await air_Gauage
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteair_Gauage = async (req, res) => {
  await air_Gauage
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
//DPSL

exports.addDPSL = async (req, res) => {
  const { dealer_Id, Due_Date, Upload_Document } = req.body;
  const newDPSL = new DPSL({
    dealer_Id: dealer_Id,

    Due_Date: Due_Date,
    Upload_Document: Upload_Document,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newDPSL.Upload_Document = alluploads;
    }
    newDPSL
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

exports.allDPSL = async (req, res) => {
  await DPSL.find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allDPSLApp = async (req, res) => {
  await DPSL.find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateDPSL = async (req, res) => {
  const { dealer_Id, Due_Date, Upload_Document } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await DPSL.findOneAndUpdate(
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

exports.getoneDPSL = async (req, res) => {
  await DPSL.findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteDPSL = async (req, res) => {
  await DPSL.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
///outher_document

exports.addouther_document = async (req, res) => {
  const { dealer_Id, Due_Date, Upload_Document, remark } = req.body;
  const newouther_document = new outher_document({
    dealer_Id: dealer_Id,

    Due_Date: Due_Date,
    Upload_Document: Upload_Document,
    remark: remark,
  });
  if (req.files) {
    if (req.files.Upload_Document[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      newouther_document.Upload_Document = alluploads;
    }
    newouther_document
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

exports.allouther_document = async (req, res) => {
  await outher_document
    .find()
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allouther_documentApp = async (req, res) => {
  await outher_document
    .find({ dealer_Id: req.params.dealer_Id })
    .populate("dealer_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updateouther_document = async (req, res) => {
  const { dealer_Id, Due_Date, Upload_Document, remark } = req.body;
  data = {};

  if (dealer_Id) {
    data.dealer_Id = dealer_Id;
  }
  if (remark) {
    data.remark = remark;
  }
  if (Due_Date) {
    data.Due_Date = Due_Date;
  }

  if (req.files) {
    if (req.files.Upload_Document) {
      alluploads = [];
      for (let i = 0; i < req.files.Upload_Document.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.Upload_Document[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.Upload_Document[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.Upload_Document = alluploads;
    }
  }
  if (data) {
    const findandUpdateEntry = await outher_document
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

exports.getoneouther_document = async (req, res) => {
  await outher_document
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteouther_document = async (req, res) => {
  await outher_document
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
