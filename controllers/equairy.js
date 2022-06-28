const Equairy = require("../models/equairy");
const resp = require("../helpers/apiresponse");
exports.addequairy = async (req, res) => {
  const { name, email, mobile, desc } = req.body;
  const newEquairy = new Equairy({
    name: name,
    email: email,
    mobile: mobile,
    desc: desc,
  });

  newEquairy
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newEquairy,
      })
    )
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.viewoneequairy = async (req, res) => {
  const findone = await Equairy.findOne({ _id: req.params.id });
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

exports.allequairy = async (req, res) => {
  const findall = await Equairy.find().sort({ sortorder: 1 });
  if (findall) {
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

exports.deleteequairy = async (req, res) => {
  try {
    const deleteentry = await Equairy.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

// exports.allequairyApp = async (req, res) => {
//   const findall = await Equairy.find({}).sort({ sortorder: 1 });
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };
