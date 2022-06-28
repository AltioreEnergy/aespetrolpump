const express = require("express");
const router = express.Router();
const {
  addFuelstock,
  allFuelstock,
  viewoneFuelstock,
  updateFuelstock,
  deleteFuelstock,
  allFuelstockApp,
} = require("../controllers/fuel_stock_management");
router.post("/dealer/addFuelstock", addFuelstock);
router.get("/dealer/allFuelstock", allFuelstock);
router.get("/dealer/viewoneFuelstock/:id", viewoneFuelstock);

router.get("/dealer/allFuelstockApp/:dealer_Id", allFuelstockApp);
router.post("/dealer/updateFuelstock/:id", updateFuelstock);

router.get("/dealer/deleteFuelstock/:id", deleteFuelstock);

module.exports = router;
