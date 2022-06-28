const User = require("../models/user");
const resp = require("../helpers/apiresponse");
//const bcrypt = require("bcrypt");
//const User = require("../models/user");

const bcrypt = require("bcryptjs");
//const cloudinary = require("cloudinary").v2;
const key = "verysecretkey";
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.signup = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const userexist = await User.findOne({ email: req.body.email });
    if (userexist) {
      let errorresponse = {
        status: 401,
        error: true,
        success: false,
        message: "Email already exist",
        data: [],
      };
      // res.send(errorresponse);
    } else if (req.files) {
      if (req.files.profilepic[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.profilepic.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.profilepic[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.profilepic[i].path);
          alluploads.push(resp.secure_url);
        }
        user.profilepic = alluploads;
      }
      //res.send(errorresponse);
    }

    if (req.files) {
      if (req.files.logo[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.logo.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.logo[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.logo[i].path);
          alluploads.push(resp.secure_url);
        }
        user.logo = alluploads;
      }
      //res.send(errorresponse);
    }

    //const user = new User(req.body);
    const result = await user.save();
    const response = {
      status: 200,
      error: false,
      success: true,
      message: "register success",
      data: result,
    };
    res.send(response);
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
}
  exports.login = async (req, res, next) => {
    try {
      let { email, password, mobile } = req.body;
      // if (!email) {
      //   const response = {
      //     status: 401,
      //     error: true,
      //     success: false,
      //     message: "email or mobile_number is requerd",
      //     data: [],
      //   };
      //   res.send(response);
      // }
      const userdetails = await User.findOne({
        $or: [
          { email: req.body.email, password: req.body.password },
          { mobile: req.body.mobile, password: req.body.password },
        ],
      });

      if (userdetails) {
        const response = {
          status: 200,

          success: true,
          message: "login success",
          data: userdetails,
        };
        res.send(response);
      } else {
        const response = {
          status: 401,
          error: true,
          success: false,
          message: "username or password not match",
          data: [],
        };
        res.send(response);
      }
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  }
exports.updateoneadmin = async (req, res) => {
  const { name, email, mobile, password, profilepic, logo } = req.body;

  data = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (password) {
    data.password = password;
  }
  if (profilepic) {
    data.profilepic = profilepic;
  }

  if (req.files) {
    if (req.files.profilepic) {
      alluploads = [];
      for (let i = 0; i < req.files.profilepic.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.profilepic[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.profilepic[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.profilepic = alluploads;
    }
  }

  if (req.files) {
    if (req.files.logo) {
      alluploads = [];
      for (let i = 0; i < req.files.logo.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.logo[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.logo[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.logo = alluploads;
    }
  }
  await User.findOneAndUpdate(
    {
      _id: req.params.id,
      //  console.log(req.params._id);
    },
    {
      $set: data,
    },
    { new: true }
  )

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};

exports.changepassadmin = async (req, res) => {
  const { cnfmPassword, password } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        password: req.body.password,
        cnfmPassword: req.body.cnfmPassword,
      },
    },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.signupsendotp = async (req, res) => {
  const defaultotp = Math.ceil(1000 + Math.random() * 9000);
  // let otp = defaultotp
  console.log("EEEE", defaultotp);

  const { mobile } = req.body;
  console.log("mobile", mobile);
  const http = require("https");
  const options = {
    method: "GET",
    hostname: "api.msg91.com",
    port: null,
    path: `/api/v5/otp?template_id=628208a271b2a516101ecb01&mobile=91${mobile}&authkey=${process.env.OTPAUTH}&otp=${defaultotp}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestmain = http.request(options, function (res) {
    console.log("rsp", res);
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  // req.write("{\"Value1\":\"Param1\",\"Value2\":\"Param2\",\"Value3\":\"Param3\"}");
  // req.end();

  // requestmain.end();
  requestmain.write('{"OTP":"6786"}');

  //let length = 6;
  //   let otp = (
  //     "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  //   ).slice(-length);
  //let otp = "123456";

  const newDealershipform = new User({
    mobile: mobile,
    otp: defaultotp,
  });
  console.log("lllll", newDealershipform);

  //const newDealershi = new Dealershipform({ mobile: mobile });
  const findexist = await User.findOne({ mobile: mobile });

  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      registered: findexist?.mobile,
      _id: findexist?._id,
      otp: defaultotp,
    });
    console.log("hehehe", findexist);
  } else {
    res.json({
      status: "false",
      msg: "Admin not available",
    });

    //  console.log("findotp",result)
  }
};

exports.verifyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const dealerDetail = await User.findOne({ mobile: mobile });
  console.log(dealerDetail);
  if (dealerDetail) {
    const token = jwt.sign(
      {
        dealerId: dealerDetail._id,
      },
      key,
      {
        expiresIn: "365d",
      }
    );
    // res.status(200).send({
    //   status: true,
    //   token: token,
    //   msg: "success",
    //   user: dealerDetail,
    // });
    const http = require("https");

    let promise = new Promise((resolve, reject) => {
      const options = {
        method: "GET",
        hostname: "api.msg91.com",
        port: null,
        // "path": `/api/v5/otp/verify?otp=${otp}&authkey=376605AJ9L85VQX6273c9beP1&mobile=91${mobile}`,
        path: `/api/v5/otp/verify?otp=${otp}&authkey=376605AJ9L85VQX6273c9beP1&mobile=91${mobile}`,
        headers: {},
      };
      // console.log("VAR",options)
      const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          const body = Buffer.concat(chunks);
          //console.log(body.toString(),"&&&&&&&&&&&&&&&");
          resolve(JSON.parse(body));
        });
      });
      req.end();
    });

    const result = await promise;
    // console.log(result,"*****************8");
    if (result.type == "error") {
      res.json({
        status: "failed",
        msg: result.message,
      });
    } else {
      res.json({
        status: "success",
        token: token,
        msg: "Welcome Back",
        otpverified: true,
      });
    }

    console.log("ELSE");
  } else {
    res.json({
      status: "failed",
      msg: "Incorrect OTP",
    });
  }
};

exports.viewoneadmin = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alladmin = async (req, res) => {
  await User.find()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

 