const express = require("express");
const router = express.Router();

const {
  addcountry,
  editcountry,
  viewonecountry,
  allcountry,
  deletecountry,
} = require("../controllers/country");

//Paths
router.post("/admin/addcountry", addcountry);
router.post("/admin/editcountry/:id", editcountry);
router.get("/admin/viewonecountry/:id", viewonecountry);
router.get("/admin/allcountry", allcountry);
//router.delete("/admin/deletecountry/:id", deletecountry)

module.exports = router;
