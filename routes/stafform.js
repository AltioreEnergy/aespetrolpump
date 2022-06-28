const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addstaff,
  allstaff,
  getonestaff,
  deletestaff,
  updateonestaff,
  allstaffApp,
  totaloutherstaff,
  //verifyotp,

  //   addeditadvancedealershipform,
  //   viewonedealershipform,
  //   alldealers,
  //   deletedealershipform
} = require("../controllers/stafform");

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
  { name: "adharimg", maxCount: 2 },
  { name: "panImg", maxCount: 1 },
  { name: "photograh", photograh: 1 },
]);

router.post("/dealer/addstaff", multipleUpload, addstaff);
router.get("/dealer/allstaff", allstaff);
router.get("/dealer/getonestaff/:id", getonestaff);
router.get("/dealer/allstaffApp/:dealer_Id", allstaffApp);
router.get("/dealer/deletestaff/:id", deletestaff);
router.post("/dealer/updateonestaff/:id", multipleUpload, updateonestaff);
router.get("/dealer/totaloutherstaff", totaloutherstaff);
module.exports = router;
