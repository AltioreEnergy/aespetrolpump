const DealershipBayMap = require("../models/bay");
const Tank = require("../models/tank")
const resp = require("../helpers/apiresponse");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";

exports.addtank = async (req, res) => {
  const {tank} = req.body
  console.log("hello")
  const newtank = new Tank({
    tank: tank,
  });

  const findexist = await Tank.findOne({tank:tank})
  if(findexist){
      res.status(400).json({
          status: false,
          msg: "Already Exists",
          data: {}
      })
  } else {
      newtank.save()
      .then(
          res.status(200).json({
              status: true,
              msg: "success",
              data: newtank
          })
      )
      .catch(error => {
          res.status(400).json({
              status: false,
              msg: "error",
              error: error
          })
      })
  }
  
}


exports.addbay = async (req, res) => {
  const {bay} = req.body
  console.log("hello")
  const newbay = new DealershipBayMap({
    bay: bay,
  });

  const findexist = await DealershipBayMap.findOne({bay:bay})
  if(findexist){
      res.status(400).json({
          status: false,
          msg: "Already Exists",
          data: {}
      })
  } else {
      newbay.save()
      .then(
          res.status(200).json({
              status: true,
              msg: "success",
              data: newbay
          })
      )
      .catch(error => {
          res.status(400).json({
              status: false,
              msg: "error",
              error: error
          })
      })
  }
  
}
exports.getbay = async (req, res) => {
    // let filter = {
    //     dealer_id: req.params.dealerid,
    //   };
    let result = await DealershipBayMap.find();
   // console.log(result);
    //await DealershipBayMap.insertMany(bay_map);
  
    resp.successr(res, result)
};
exports.gettank = async (req, res) => {
 //await Tank.remove()
  
  let result = await Tank.find();
 // console.log(result.tank);
  //await DealershipBayMap.insertMany(bay_map);

  resp.successr(res, result)
};
