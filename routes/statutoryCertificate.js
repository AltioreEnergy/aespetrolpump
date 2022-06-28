const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  // allstatutoryCertificate,
  // getonestatutoryCertificate,
  // deletestatutoryCertificate,
  // updateonestatutoryCertificate,
  addcan5lFM,
  allcan5lFMApp,
  getonecan5lFMApp,
  updatecan5lFM,
  deletecan5lFM,
  addPESO_FM,
  allPESO_FM,
  allPESO_FMApp,
  getonePESO_FM,
  updatePESO_FM,
  deletePESO_FM,
  addhydrometerFM,
  allhydrometerFM,
  allhydrometerFMApp,
  getonehydrometerFM,
  updatehydrometerFM,
  deletehydrometerFM,
  addthermometerFM,
  allthermometerFM,
  allthermometerFMApp,
  updatethermometerFM,
  getonethermometerFM,
  deletethermometerFM,
  addair_Gauage,
  allair_Gauage,
  allair_GauageApp,
  updateair_Gauage,
  getoneair_Gauage,
  deleteair_Gauage,
  addDPSL,
  allDPSL,
  allDPSLApp,
  updateDPSL,
  getoneDPSL,
  deleteDPSL,
  addouther_document,
  allouther_documentApp,
  updateouther_document,
  getoneouther_document,
  deleteouther_document,
} = require("../controllers/statutoryCertificate");

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
  { name: "Upload_Document", maxCount: 1 },
  { name: "Upload_certificate", maxCount: 1 },
  // { name: "Upload_Hydrometer", maxCount: 1 },
  // { name: "uplodad_thermameter", maxCount: 2 },
  // { name: "DPSL_upload", maxCount: 1 },
  // { name: "upload_outher", maxCount: 1 },
  // { name: "uplodad_air_gauage", maxCount: 1 },
]);

//PATHS

router.post("/dealer/addcan5lFM", multipleUpload, addcan5lFM);

// router.get("/dealer/allstatutoryCertificate", allstatutoryCertificate);
router.get("/dealer/allcan5lFMApp/:dealer_Id", allcan5lFMApp);
router.get("/dealer/getonecan5lFMApp/:id", getonecan5lFMApp);
router.post("/dealer/updatecan5lFM/:id", multipleUpload, updatecan5lFM);
router.get("/dealer/deletecan5lFM/:id", deletecan5lFM);
///PESO_FM
router.post("/dealer/addPESO_FM", multipleUpload, addPESO_FM);
router.get("/dealer/allPESO_FM", allPESO_FM);
router.get("/dealer/allPESO_FMApp/:dealer_Id", allPESO_FMApp);
router.get("/dealer/getonePESO_FM/:id", getonePESO_FM);
router.post("/dealer/updatePESO_FM/:id", multipleUpload, updatePESO_FM);
router.get("/dealer/deletePESO_FM/:id", deletePESO_FM);

////addhydrometerFM
router.post("/dealer/addhydrometerFM", multipleUpload, addhydrometerFM);
router.get("/dealer/allhydrometerFM", allhydrometerFM);
router.get("/dealer/allhydrometerFMApp/:dealer_Id", allhydrometerFMApp);
router.get("/dealer/getonehydrometerFM/:id", getonehydrometerFM);
router.post(
  "/dealer/updatehydrometerFM/:id",
  multipleUpload,
  updatehydrometerFM
);
router.get("/dealer/deletehydrometerFM/:id", deletehydrometerFM);

//thermometerFM
router.post("/dealer/addthermometerFM", multipleUpload, addthermometerFM);
router.get("/dealer/allthermometerFM", allthermometerFM);
router.get("/dealer/allthermometerFMApp/:dealer_Id", allthermometerFMApp);
router.post(
  "/dealer/updatethermometerFM/:id",
  multipleUpload,
  updatethermometerFM
);
router.get("/dealer/deletethermometerFM/:id", deletethermometerFM);
router.get("/dealer/getonethermometerFM/:id", getonethermometerFM);

///air_Gauage

router.post("/dealer/addair_Gauage", multipleUpload, addair_Gauage);
router.get("/dealer/allair_Gauage", allair_Gauage);
router.get("/dealer/allair_GauageApp/:dealer_Id", allair_GauageApp);
router.post("/dealer/updateair_Gauage/:id", multipleUpload, updateair_Gauage);
router.get("/dealer/getoneair_Gauage/:id", getoneair_Gauage);
router.get("/dealer/deleteair_Gauage/:id", deleteair_Gauage);
//DPSL

router.post("/dealer/addDPSL", multipleUpload, addDPSL);
router.get("/dealer/allDPSL", allDPSL);
router.get("/dealer/allDPSLApp/:dealer_Id", allDPSLApp);
router.post("/dealer/updateDPSL/:id", multipleUpload, updateDPSL);
router.get("/dealer/getoneDPSL/:id", getoneDPSL);
router.get("/dealer/deleteDPSL/:id", deleteDPSL);

///outher_document

router.post("/dealer/addouther_document", multipleUpload, addouther_document);
router.get("/dealer/allouther_documentApp/:dealer_Id", allouther_documentApp);
router.post(
  "/dealer/updateouther_document/:id",
  multipleUpload,
  updateouther_document
);
router.get("/dealer/getoneouther_document/:id", getoneouther_document);
router.get("/dealer/deleteouther_document/:id", deleteouther_document);
module.exports = router;
