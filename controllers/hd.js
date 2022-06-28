const hd = require("../models/hd");
const resp = require("../helpers/apiresponse");
exports.addopning_liter = async (req, res) => {
    const {
      date,
      opning_liter
     
    } = req.body;
  
    const newhd = new hd({
date: date,
        opning_liter: opning_liter,
      
    });
   
    newhd
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
exports.allopnigliter = async (req, res) => {
  await bm
       .find()
.populate([
{
        path:'opning_liter',
        select:'closing_total1'
}
      ])

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
