const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  addbank,
  allbank,
  getonebank,
  deletebank,
  updateonebank,
  allbankApp
} = require("../controllers/bank");
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
  { name: "document_upload", maxCount: 1 },
 
  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

//PATHS
router.post("/dealer/addbank",multipleUpload, addbank);
router.get("/dealer/allbank", allbank);
router.get("/dealer/allbankApp/:dealer_name1", allbankApp);
router.get("/dealer/getonebank/:id", getonebank);
router.get("/dealer/deletebank/:id", deletebank);
router.post("/dealer/updateonebank/:id",multipleUpload, updateonebank);

module.exports = router;
