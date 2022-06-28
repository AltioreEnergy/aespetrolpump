const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addDsnform,
  getDsnform,
  getoneDsnform,
  deleteDsnform,
  editDsnform,
  getDsnformApp,
  totaldsm,
} = require("../controllers/dsmform");

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
]);

router.post("/dealer/addDsnform", multipleUpload, addDsnform);
router.get("/dealer/getDsnform", getDsnform);
router.get("/dealer/getoneDsnform/:id", getoneDsnform);
router.get("/dealer/getDsnformApp/:dealer_Id", getDsnformApp);
router.get("/dealer/deleteDsnform/:id", deleteDsnform);
router.post("/dealer/editDsnform/:id", multipleUpload, editDsnform);
router.get("/dealer/totaldsm", totaldsm);
module.exports = router;
