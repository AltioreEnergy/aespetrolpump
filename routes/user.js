const express = require("express");
const router = express.Router();
const { verifyToken } = require("../functions/tokenverify");
const multer = require("multer");
const fs = require("fs");

const {
  signup,
  login,
  //   setting,
  //   changepass,
  //   changepassid,
  //   viewoneuser,
  updateoneadmin,
  changepassadmin,
  signupsendotp,
  verifyotp,
  viewoneadmin,
  alladmin,
  //   allusers,
  //   deleteuser,
  //   myprofile
} = require("../controllers/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "profilepic", maxCount: 2 },
  { name: "logo", maxCount: 1 },
  // { name: "photograh", photograh: 1 },
  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);
//router.post("/user/setting", tokenverify, setting);
router.post("/user/signup", multipleUpload, signup);
router.post("/user/signupsendotp", signupsendotp);
router.post("/user/verifyotp", verifyotp);
router.post("/user/login", login);
router.post("/user/updateoneadmin/:id", multipleUpload, updateoneadmin);
router.post("/user/changepassadmin/:id", changepassadmin);
router.get("/user/viewoneadmin/:id", viewoneadmin);
router.get("/user/alladmin", alladmin);
module.exports = router;
