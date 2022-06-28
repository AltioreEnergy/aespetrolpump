const Notification = require("../models/notification");
const resp = require("../helpers/apiresponse");
exports.addnotification = async (req, res) => {
  const { dealer, desc } = req.body;
  const newNotification = new Notification({
    dealer: dealer,
    desc: desc,
  });

  newNotification
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newNotification,
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

exports.viewonenotification = async (req, res) => {
  const findone = await Notification.findOne({ _id: req.params.id }).populate(
    "dealer"
  );
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

exports.allnotification = async (req, res) => {
  const findall = await Notification.find()
    .sort({ createdAt: -1 })
    .populate("dealer")
    .sort({ sortorder: 1 });
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
exports.allnotificationApp = async (req, res) => {
  await Notification.find({ dealer: req.params.dealer })
    .populate("dealer")

    .sort({ createdAt: -1 })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletenotification = async (req, res) => {
  try {
    const deleteentry = await Notification.deleteOne({ _id: req.params.id });
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
