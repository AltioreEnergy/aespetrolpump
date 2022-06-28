const lubestock = require("../models/lubestock");
const resp = require("../helpers/apiresponse")


let  getCurrentDate = function() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
}
exports.addlubestock= async (req, res) => {
  const {
    dealer_name1,
    date,
    grade,
    opening_stock,
    rsp,
    purchase_price,
    selling_price_maintained,
    no_of_pieces,
    amount_before_tax,
    cgst,
    sgst,
    final_inventory
  } = req.body;

  const newlubestock= new lubestock({
    dealer_name1:dealer_name1,
    date: getCurrentDate(),
    grade : grade,
    opening_stock: opening_stock,
    rsp: rsp,
    purchase_price: purchase_price,
    selling_price_maintained:selling_price_maintained,
    no_of_pieces:no_of_pieces,
    amount_before_tax:amount_before_tax,
    cgst:cgst,
    sgst:sgst,
    final_inventory:final_inventory
  });


  newlubestock .save()
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
  };

  exports.alllubestock = async (req, res) => {
    await lubestock
      .find().populate("dealer_name1")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.alllubestockApp = async (req, res) => {
    await lubestock
      .find({dealer_name1:req.params.dealer_name1}).populate("dealer_name1")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getonelubestock = async (req, res) => {
    await lubestock
      .findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.deletelubestock= async (req, res) => {
    await lubestock.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  
  exports.updatelubestock = async (req, res) => {
    console.log(req.params.id);
  await lubestock
   
      .findOneAndUpdate(
        {
          _id: req.params.id,
        //  console.log(req.params._id);
      },
        {
          $set: req.body,
        },
        { new: true }
      )
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      console.log(req.params._id);
  };
  