const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addStampingdata,
  allStampingdata,
  getoneStampingdata,
  deleteStampingdata,
  updateStampingdata,
  allStampingdataApp,
} = require("../controllers/Stampingdata");

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
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "Upload_Certificate", maxCount: 1 },
  { name: "Upload_Service_Report", maxCount: 1 },
  { name: "Last_Service_Report", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/dealer/addStampingdata", multipleUpload, addStampingdata);
router.get("/dealer/allStampingdata", allStampingdata);
router.get("/dealer/getoneStampingdata/:id", getoneStampingdata);
router.get("/dealer/allStampingdataApp/:dealer_Id", allStampingdataApp);
router.get("/dealer/deleteStampingdata/:id", deleteStampingdata);
router.post(
  "/dealer/updateStampingdata/:id",
  multipleUpload,
  updateStampingdata
);

module.exports = router;
