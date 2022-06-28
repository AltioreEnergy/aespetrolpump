const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addmenegerform,
  allmanager,
  getonemanager,
  deletemanager,
  updateonemanager,
  allmanagerApp,
  managerlogin,
  totalmaneger,
  //verifyotp,

  //   addeditadvancedealershipform,
  //   viewonedealershipform,
  //   alldealers,
  //   deletedealershipform
} = require("../controllers/managerform");

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
  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//PATHS

router.post("/dealer/addmenegerform", multipleUpload, addmenegerform);
// router.post("/dealer/addmenegerform",uploads.fields([
//   {
//     name: "panImg",
//   },
//   {
//     name: "photograh"}]),addmenegerform);
router.get("/dealer/allmanager", allmanager);
router.get("/dealer/getonemanager/:id", getonemanager);
router.get("/dealer/allmanagerApp/:dealer_id", allmanagerApp);
//router.post("/dealer/addmenegerform/:id", addmenegerform);
router.get("/dealer/deletemanager/:id", deletemanager);
router.post("/dealer/updateonemanager/:id", multipleUpload, updateonemanager);
router.post("/manager/managerlogin", managerlogin);
router.get("/dealer/totalmaneger", totalmaneger);
module.exports = router;
