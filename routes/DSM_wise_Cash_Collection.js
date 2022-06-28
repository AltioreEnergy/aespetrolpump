const express = require("express");
const router = express.Router();
const {
  DSM_wise_Cash_Collection,
} = require("../controllers/DSM_wise_Cash_Collection");
router.post("/dealer/DSM_wise_Cash_Collection", DSM_wise_Cash_Collection);

module.exports = router;
