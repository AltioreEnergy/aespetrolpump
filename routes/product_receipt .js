const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addReceipt,
  allReceipt,
  getoneReceipt,
  deleteReceipt,
  updateReceipt,
  allReceiptApp,
  //verifyotp,

  //   addeditadvancedealershipform,
  //   viewonedealershipform,
  //   alldealers,
  //   deletedealershipform
} = require("../controllers/product_receipt ");

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
  { name: "Upload_of_signed_copy_of_Invoice", maxCount: 2 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/dealer/addReceipt", multipleUpload, addReceipt);
// router.post("/dealer/addmenegerform",uploads.fields([
//   {
//     name: "panImg",
//   },
//   {
//     name: "photograh"}]),addmenegerform);
router.get("/dealer/allReceipt", allReceipt);
router.get("/dealer/getoneReceipt/:id", getoneReceipt);
router.get("/dealer/allReceiptApp/:dealer_Id", allReceiptApp);
//router.post("/dealer/addmenegerform/:id", addmenegerform);
router.get("/dealer/deleteReceipt/:id", deleteReceipt);
router.post("/dealer/updateReceipt/:id", multipleUpload, updateReceipt);

module.exports = router;
