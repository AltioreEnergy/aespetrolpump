const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addequipment,
  allequipment,
  getoneequipment,
  deleteequipment,
  updateequipment,
  allequipmentApp,
  addequpmentFm,
  allequpmentFmApp,
  getoneequpmentFm,
  deleteequpmentFm,
  updateequpmentFm,
} = require("../controllers/FMotherEquipment");

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
  { name: "Upload_Fire_Equipment", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);
//router.post("/admin/addstate", addstate)
router.get("/dealer/allequipment", allequipment);
router.post("/dealer/addequipment", multipleUpload, addequipment);
router.get("/dealer/getoneequipment/:id", getoneequipment);
router.get("/dealer/allequipmentApp/:dealer_Id", allequipmentApp);
router.get("/dealer/deleteequipment/:id", deleteequipment);
router.post("/dealer/updateequipment/:id", multipleUpload, updateequipment);

router.post("/dealer/addequpmentFm", multipleUpload, addequpmentFm);
router.get("/dealer/allequpmentFmApp/:dealer_Id", allequpmentFmApp);
router.get("/dealer/getoneequpmentFm/:id", getoneequpmentFm);
router.get("/dealer/deleteequpmentFm/:id", deleteequpmentFm);
router.post("/dealer/updateequpmentFm/:id", multipleUpload, updateequpmentFm);
//console
module.exports = router;
