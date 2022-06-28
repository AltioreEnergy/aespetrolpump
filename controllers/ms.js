const ms = require("../models/ms");
const resp = require("../helpers/apiresponse");
exports.addopning_dip= async (req, res) => {
    const {
        opning_dip,
   
     
    } = req.body;
  
    const newms = new ms({
        opning_dip: opning_dip,
      
      
    });
    const findexist = await ms.findOne({ opning_dip: opning_dip });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  }
    newms
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
}
