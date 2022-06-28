const bm = require("../models/baymanagement");
const resp = require("../helpers/apiresponse");
const Baymanagement = require("../models/baymanagement");
const Closingbm = require("../models/closingbm");

exports.addbm = async (req, res) => {
  let bmobject = {
    dealer_id:req.body.dealer_id,
    bay_id:req.body.bay_id,
    opnning_ltr:req.body.opnning_ltr
  }
  let result = await Baymanagement.create(bmobject);
  //await DealershipBayMap.insertMany(bay_map);

  resp.successr(res, result)
};

exports.closebm = async (req, res) => {

  let baym = await Baymanagement.findOne({_id:req.body.bm_id});
  if(baym){
    let opnning_ltr = baym.opnning_ltr - req.body.closing_entry 
    await Baymanagement.findOneAndUpdate({_id:req.body.bm_id}, {remanning_ltr:opnning_ltr});
    let bmobject = {
      closing_entry:req.body.closing_entry,
      bm_id:req.body.bm_id,
      dsm_id:req.body.dsm_id,
      dsm_name:req.body.dsm_name,
      remanning_ltr:baym.opnning_ltr - req.body.closing_entry
    }
    await Closingbm.create(bmobject);
  }  
  //await DealershipBayMap.insertMany(bay_map);

  resp.successr(res, [])
};

  