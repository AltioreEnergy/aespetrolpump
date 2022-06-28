const express = require("express");
const router = express.Router();

const {
  addtank,
  addbay,
  getbay,
  gettank
} = require("../controllers/dealercommon");

//Paths
// router.post("/dealer/addbay", addbay);
// router.post("/dealer/addtank", addtank);
// router.get("/dealer/getbay", getbay);
// router.get("/dealer/gettank", gettank);

module.exports = router;

