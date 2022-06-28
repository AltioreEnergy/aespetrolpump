const About = require("../models/about");
const resp = require("../helpers/apiresponse");

exports.addabout = async (req, res) => {
  const { desc } = req.body;
  const newAbout = new About({
    desc: desc,
  });

  newAbout
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newAbout,
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

exports.viewoneabout = async (req, res) => {
  const findone = await About.findOne({ _id: req.params.id });
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

exports.allabout = async (req, res) => {
  const findall = await About.find().sort({ sortorder: 1 });
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

exports.deleteabout = async (req, res) => {
  try {
    const deleteentry = await About.deleteOne({ _id: req.params.id });
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

 
  

  exports.edit_aboutus = async (req, res) => {
    await About.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params.id);
    };