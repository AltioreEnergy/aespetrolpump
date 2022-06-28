const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addCreditBankFM,
  allCreditBankFM,
  getoneCreditBankFM,
  deleteCreditBankFM,
  updateCreditBankFM,
  allCreditBankFMApp,
} = require("../controllers/CreditBankFM");

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
  { name: "Uplaod_Document", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

router.get("/dealer/allCreditBankFM", allCreditBankFM);
router.post("/dealer/addCreditBankFM", multipleUpload, addCreditBankFM);
router.get("/dealer/getoneCreditBankFM/:id", getoneCreditBankFM);
router.get("/dealer/deleteCreditBankFM/:id", deleteCreditBankFM);
router.get("/dealer/allCreditBankFMApp/:dealer_Id", allCreditBankFMApp);
router.post(
  "/dealer/updateCreditBankFM/:id",
  multipleUpload,
  updateCreditBankFM
);
//console
module.exports = router;
