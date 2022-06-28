const express = require("express");
const router = express.Router();
const {
  addprofit,
  allprofit,
  getoneprofit,
  deleteprofit,
  updateoneprofit,

  allprofitApp,
} = require("../controllers/profit");
router.post("/dealer/addprofit", addprofit);
router.get("/dealer/allprofit", allprofit);
router.get("/dealer/allprofitApp/:dealer_id", allprofitApp);
router.get("/dealer/getoneprofit/:id", getoneprofit);
router.get("/dealer/deleteprofit/:id", deleteprofit);
router.post("/dealer/updateoneprofit/:id", updateoneprofit);

module.exports = router;
