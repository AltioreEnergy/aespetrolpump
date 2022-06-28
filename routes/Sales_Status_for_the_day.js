const express = require("express");
const router = express.Router();
const { salesReport } = require("../controllers/Sales_Status_for_the_day");
router.post("/dealer/salesReport", salesReport);

module.exports = router;
