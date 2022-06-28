const express = require("express");
const router = express.Router();

const {
    addcreditcustomer,
    addopning_dip,
    getonecreditcustomer,
    deletecreditcustomer,
    updatcreditcustomer,
  } = require("../controllers/ms");
  router.post("/dealer/addopning_dip",addopning_dip);
  
  module.exports = router;