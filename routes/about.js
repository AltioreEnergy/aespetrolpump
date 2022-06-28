const express = require("express");
const router = express.Router();

const {
  addabout,

  viewoneabout,
  allabout,
  deleteabout,
  edit_aboutus
} = require("../controllers/about");

//Paths
router.post("/admin/addabout", addabout);

router.get("/admin/viewoneabout/:id", viewoneabout);
router.get("/admin/allabout", allabout);
router.get("/admin/deleteabout/:id", deleteabout);
router.post("/admin/edit_aboutus/:id", edit_aboutus);

module.exports = router;
