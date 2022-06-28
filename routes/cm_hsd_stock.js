const express = require("express");
const router = express.Router();
const {
  addHsdStock,
  allHsdStock,
  viewoneHsdStock,
  deleteHsdStock,
  updateonebankDeposits,
  allHsdStockApp,
} = require("../controllers/cm_hsd_stock");

//PATHS

//PATHS
router.post("/dealer/addHsdStock", addHsdStock);
router.get("/dealer/allHsdStock", allHsdStock);
router.get("/dealer/viewoneHsdStock/:id", viewoneHsdStock);
router.get("/dealer/deleteHsdStock/:id", deleteHsdStock);
router.get("/dealer/allHsdStockApp/:dealer_Id", allHsdStockApp);
// router.post("/dealer/updateonebankDeposits/:id", updateonebankDeposits);

module.exports = router;
