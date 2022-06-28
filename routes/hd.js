const express = require("express");
const router = express.Router();

const {
    // addcreditcustomer,
    addopning_liter,
    // getonecreditcustomer,
    // deletecreditcustomer,
    // updatcreditcustomer,
  } = require("../controllers/hd");
  router.post("/dealer/addopning_liter",addopning_liter);
  
  module.exports = router;