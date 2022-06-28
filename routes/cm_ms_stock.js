const express = require("express");
const router = express.Router();
const {
  addMsStock,
  allMsStock,
  viewoneMsStock,
  deleteMsStock,
  updateonebankDeposits,
  allMsStockApp,
} = require("../controllers/cm_ms_stock");

//PATHS

//PATHS
router.post("/dealer/addMsStock", addMsStock);
router.get("/dealer/allMsStock", allMsStock);
router.get("/dealer/viewoneMsStock/:id", viewoneMsStock);
router.get("/dealer/deleteMsStock/:id", deleteMsStock);
router.get("/dealer/allMsStockApp/:dealer_Id", allMsStockApp);
// router.post("/dealer/updateonebankDeposits/:id", updateonebankDeposits);

module.exports = router;
