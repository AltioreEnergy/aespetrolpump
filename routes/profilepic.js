const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    addprofilepic,
    allprofilepic,
     updateprofilepic,
     viewonepic
//   deletecreditcustomer,
//   updatcreditcustomer,
//   namefindcreditcustomer
} = require("../controllers/profilepic");

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
  { name: "profilepic", maxCount: 1 },
 
  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/dealer/addprofilepic", multipleUpload, addprofilepic);
router.get("/dealer/allprofilepic",allprofilepic);

// //router.get("/dealer/allcreditcustomer", allcreditcustomer);
router.get("/dealer/viewonepic/:id", viewonepic);
// router.get("/dealer/deletecreditcustomers/:id", deletecreditcustomer);
// router.get("/dealer/namefindcreditcustomer/:name_of_customer/:vehicle_no", namefindcreditcustomer);
router.post("/dealer/updateprofilepic/:id", multipleUpload,updateprofilepic);

module.exports = router;
