const express = require("express");
const router = express.Router();

const {
  addnotificationtwo,

  viewonenotificationtwo,
  allnotificationtwo,
  deletenotificationtwo,
} = require("../controllers/notificationtwo");

//Paths
router.post("/admin/addnotificationtwo", addnotificationtwo);

router.get("/admin/viewonenotificationtwo/:id", viewonenotificationtwo);
router.get("/admin/allnotificationtwo", allnotificationtwo);
router.get("/admin/deletenotificationtwo/:id", deletenotificationtwo);

module.exports = router;
