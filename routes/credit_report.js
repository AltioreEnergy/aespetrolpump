const express = require("express");
const router = express.Router();
const { credit_report } = require("../controllers/credit_report");
router.post("/dealer/credit_report", credit_report);

module.exports = router;
