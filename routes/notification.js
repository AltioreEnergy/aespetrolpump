const express = require("express");
const router = express.Router();

const {
  addnotification,

  viewonenotification,
  allnotification,
  deletenotification,
  allnotificationApp,
} = require("../controllers/notification");

//Paths
router.post("/admin/addnotification", addnotification);

router.get("/admin/viewonenotification/:id", viewonenotification);
router.get("/admin/allnotificationApp/:dealer", allnotificationApp);
router.get("/admin/allnotification", allnotification);
router.delete("/admin/deletenotification/:id", deletenotification);

module.exports = router;
