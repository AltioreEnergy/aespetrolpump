const express = require("express");
const router = express.Router();

const {
  addpolicy,

  viewonepolicy,
  allpolicy,
  deletepolicy,
} = require("../controllers/policy");

//Paths
router.post("/admin/addpolicy", addpolicy);

router.get("/admin/viewonepolicy/:id", viewonepolicy);
router.get("/admin/allpolicy", allpolicy);
router.get("/admin/deletepolicy/:id", deletepolicy);

module.exports = router;
