const express = require("express");
const router = express.Router();

const {
  addcashinbank,
  allcashinbankApp,
  allcashinbank,
  getonecashinbank,
  deletecashinbank,
  updatecashinbank,
} = require("../controllers/cashinbank");

router.post("/dealer/addcashinbank", addcashinbank);

router.get("/dealer/allcashinbank", allcashinbank);
router.get("/dealer/getonecashinbank/:id", getonecashinbank);
router.get("/dealer/allcashinbankApp/:dealer_Id", allcashinbankApp);
router.post("/dealer/updatecashinbank/:id", updatecashinbank);

router.get("/dealer/deletecashinbank/:id", deletecashinbank);

module.exports = router;
