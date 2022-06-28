const Country = require("../models/country");
const State = require("../models/state");
const City = require("../models/city");
exports.addcountry = async (req, res) => {
  const { iso_code, name, phonecode } = req.body;
  const newCountry = new Country({
    iso_code: iso_code,
    name: name,
    phonecode: phonecode,
  });

  const findexist = await Country.findOne({ iso_code: iso_code });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCountry
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newCountry,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.editcountry = async (req, res) => {
  const findandUpdateEntry = await Country.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
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
};

exports.viewonecountry = async (req, res) => {
  const findone = await Country.findOne({ _id: req.params.id });
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

exports.allcountry = async (req, res) => {
  const findall = await Country.find().sort({ sortorder: 1 });
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

exports.deletecountry = async (req, res) => {
  try {
    const deleteentry = await Country.deleteOne({ _id: req.params.id });
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
