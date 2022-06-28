const policy = require("../models/policy");
exports.addpolicy = async (req, res) => {
  const { desc } = req.body;
  const newpolicy = new policy({
    desc: desc,
  });

  newpolicy
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newpolicy,
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

exports.viewonepolicy = async (req, res) => {
  const findone = await policy.findOne({ _id: req.params.id });
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

exports.allpolicy = async (req, res) => {
  const findall = await policy.find().sort({ sortorder: 1 });
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

exports.deletepolicy = async (req, res) => {
  try {
    const deleteentry = await policy.deleteOne({ _id: req.params.id });
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
