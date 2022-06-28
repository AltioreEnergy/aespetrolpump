const Creditcustomers = require("../models/creditcustomers");
const resp = require("../helpers/apiresponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.addcreditcustomer = async (req, res) => {
  const {
    dealer_name1,
    name_of_customer,
    addres,
    mobile,
    credit_limit,
    credit_term_lube,
    local_id,
    document_upload,
    vehicle_no,
    local_guarantor_name,
    local_guarantor_no,
    credit_term_Fuel
  } = req.body;

  const newcreditcustomerform = new Creditcustomers({
    dealer_name1:dealer_name1,
   name_of_customer: name_of_customer,
    addres: addres,
    mobile: mobile,
    credit_limit: credit_limit,
    credit_term_lube: credit_term_lube,
    local_id: local_id,
     document_upload: document_upload,
    vehicle_no: vehicle_no,
    local_guarantor_name: local_guarantor_name,
    local_guarantor_no: local_guarantor_no, 
    credit_term_Fuel:credit_term_Fuel
  });

  const findexist = await Creditcustomers.findOne({mobile: mobile });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  }else if (req.files) {
    if (req.files.document_upload) {
      alluploads = [];
      for (let i = 0; i < req.files.document_upload.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.document_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.document_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      newcreditcustomerform.document_upload = alluploads;
    }
   
    newcreditcustomerform
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
}

exports.allcreditcustomer = async (req, res) => {
  console.log(res.params);
  await Creditcustomers
    .find().sort({ createdAt: -1 }).populate("dealer_name1")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcreditcustomerApp = async (req, res) => {
  console.log(res.params);
  await Creditcustomers
    .find({dealer_name1:req.params.dealer_name1}).sort({ createdAt: -1 }).populate("dealer_name1")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
//find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

exports.getonecreditcustomer = async (req, res) => {
  await Creditcustomers
    .findOne({ _id: req.params.id }).populate("dealer_name1")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.namefindcreditcustomer = async (req, res) => {
  const{name_of_customer}=req.body
  const data = await Creditcustomers.find({name_of_customer}).populate("dealer_name1")
//  if (findexist1) {
//     res.status(400).json({
//       status: true,
//       msg: "record Exist",
//       data:name_of_customer,
     
//     });
//   }
     .then((data) => resp.successr(res, data))
     .catch((error) => resp.errorr(res, error));
};

exports.deletecreditcustomer = async (req, res) => {
  await Creditcustomers
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatcreditcustomer = async (req, res) => {
  const {
    dealer_name1,
    name_of_customer,
    addres,
    mobile,
    credit_limit,
    credit_term_lube,
    local_id,
    document_upload,
    vehicle_no,
    local_guarantor_name,
    local_guarantor_no,
  } = req.body;
  data = {};
  if (dealer_name1) {
    data.dealer_name1 = dealer_name1;
  }
  if (addres) {
    data.addres = addres;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (name_of_customer) {
    data.name_of_customer = name_of_customer;
  }
  if (credit_limit) {
    data.credit_limit = credit_limit;
  }

  if (credit_term_lube) {
    data.credit_term_lube = credit_term_lube;
  }
  if (local_id) {
    data.local_id = local_id;
  }
  if (vehicle_no) {
    data.vehicle_no = vehicle_no;
  }

  if (local_guarantor_name) {
    data.local_guarantor_name = local_guarantor_name;
  }
  if (local_guarantor_no) {
    data.local_guarantor_no =local_guarantor_no;
  }
  
  if (req.files) {
    if (req.files.document_upload) {
      alluploads = [];
      for (let i = 0; i < req.files.document_upload.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.document_upload[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.document_upload[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.document_upload = alluploads;
    }
    if (data) {
      const findandUpdateEntry = await Creditcustomers.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      ).populate("dealer_name1");;

      if (findandUpdateEntry) {
        res.status(200).json({
          status: true,
          msg: "success",
          data: findandUpdateEntry,
        })
      } else {
        res.status(400).json({
          status: false,
          msg: "error",
          error: "error",
        });
      }
    }
  }
}



