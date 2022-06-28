const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addbankDeposits,
  allbankDeposits,
  getonebankDeposits,
  deletebankDeposits,
  updateonebankDeposits,
  allbankDepositsApp,
} = require("../controllers/bankDeposits");

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
  { name: "document_upload", maxCount: 2 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

//PATHS
router.post("/dealer/addbankDeposits", multipleUpload, addbankDeposits);
router.get("/dealer/allbankDeposits", allbankDeposits);
router.get("/dealer/getonebankDeposits/:id", getonebankDeposits);
router.get("/dealer/deletebankDeposits/:id", deletebankDeposits);
router.get("/dealer/allbankDepositsApp/:dealer_Id", allbankDepositsApp);
router.post(
  "/dealer/updateonebankDeposits/:id",
  multipleUpload,
  updateonebankDeposits
);

module.exports = router;
