const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addcreditcustomer,
  allcreditcustomer,
  getonecreditcustomer,
  deletecreditcustomer,
  updatcreditcustomer,
  namefindcreditcustomer,
  allcreditcustomerApp
} = require("../controllers/creditcustomers");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// const uploadStorage = multer({ storage: storage })

// // Single file
// app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })
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

router.post("/dealer/addcreditcustomers", multipleUpload, addcreditcustomer);
router.get("/dealer/allcreditcustomer",allcreditcustomer);
router.get("/dealer/allcreditcustomerApp/:dealer_name1", allcreditcustomerApp);
//router.get("/dealer/allcreditcustomer", allcreditcustomer);
router.get("/dealer/getonecreditcustomers/:id", getonecreditcustomer);
router.get("/dealer/deletecreditcustomers/:id", deletecreditcustomer);
router.post("/dealer/namefindcreditcustomer", namefindcreditcustomer);
router.post("/dealer/updatecreditcustomers/:id", multipleUpload,updatcreditcustomer);

module.exports = router;
