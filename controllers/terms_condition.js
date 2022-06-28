const TermsCondition = require("../models/terms_condition");
const resp = require("../helpers/apiresponse");
exports.add_termscondition = async (req, res) => {
  const {   desc } = req.body;
  const newTermsCondition = new TermsCondition({
  
    desc: desc,
  });

  newTermsCondition
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newTermsCondition,
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



exports.viewonecondition = async (req, res) => {
    const findone = await TermsCondition.findOne({ _id: req.params.id });
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
  
  exports.alltermscondition = async (req, res) => {
    const findall = await TermsCondition.find().sort({ sortorder: 1 });
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
  
  exports.deletecondition = async (req, res) => {
    try {
      const deleteentry = await TermsCondition.deleteOne({ _id: req.params.id });
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
  
   
    
  
    exports.edit_termscondition = async (req, res) => {
      await TermsCondition.findOneAndUpdate(
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