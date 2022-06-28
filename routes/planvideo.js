const express = require("express");
const router = express.Router();

const {
  addplan,
  editplan,
  viewoneplan,
  allplan,
  deleteplan,
} = require("../controllers/planvideo");

//Paths
router.post("/admin/addplan", addplan);
router.post("/admin/editplan/:id", editplan);
router.get("/admin/viewoneplan/:id", viewoneplan);
router.get("/admin/allplan", allplan);
router.get("/admin/deleteplan/:id", deleteplan);

module.exports = router;
