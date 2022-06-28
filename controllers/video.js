const Video = require("../models/video");
exports.addvideo = async (req, res) => {
  const { title, desc, link } = req.body;
  const newVideo = new Video({
    title: title,
    desc: desc,
    link: link,
  });

  newVideo
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newVideo,
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

exports.viewonevideo = async (req, res) => {
  const findone = await Video.findOne({ _id: req.params.id });
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

exports.allvideo = async (req, res) => {
  const findall = await Video.find().sort({ sortorder: 1 });
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

exports.deletevideo = async (req, res) => {
  try {
    const deleteentry = await Video.deleteOne({ _id: req.params.id });
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
