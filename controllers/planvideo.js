const Plan = require("../models/planvideo");
const resp = require("../helpers/apiresponse");

exports.addplan = async (req, res) => {
  const { video_link, associated_plan} = req.body;

  const newPlan = new Plan({
    video_link: video_link,
    associated_plan: associated_plan,
  });
  const findexist = await Plan.findOne({ associated_plan: associated_plan });
  if (findexist) {
    resp.alreadyr(res,'Plan');
  } else {
    newPlan
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editplan = async (req, res) => {
  await Plan.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneplan = async (req, res) => {
  await Plan.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allplan = async (req, res) => {
  await Plan.find()
  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteplan = async (req, res) => {
  await Plan.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
