const Notificationtwo = require("../models/notificationtwo");
exports.addnotificationtwo = async (req, res) => {
  const { dealer, staff, desc } = req.body;
  const newNotificationtwo = new Notificationtwo({
    dealer: dealer,
    desc: desc,
    staff: staff,
  });

  newNotificationtwo
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newNotificationtwo,
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

exports.viewonenotificationtwo = async (req, res) => {
  const findone = await Notificationtwo.findOne({ _id: req.params.id });
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

exports.allnotificationtwo = async (req, res) => {
  const findall = await Notificationtwo.find().sort({ sortorder: 1 });
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

exports.deletenotificationtwo = async (req, res) => {
  try {
    const deleteentry = await Notificationtwo.deleteOne({ _id: req.params.id });
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
