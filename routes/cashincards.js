const express = require("express");
const router = express.Router();

const {
  addcashincards,
  allcashincardsApp,
  allcashincards,
  getonecashincards,
  deletecashincards,
  updatecashinbank,
} = require("../controllers/cashincards");

router.post("/dealer/addcashincards", addcashincards);

router.get("/dealer/allcashincards", allcashincards);
router.get("/dealer/getonecashincards/:id", getonecashincards);
router.get("/dealer/allcashincardsApp/:dealer_Id", allcashincardsApp);
// router.post("/dealer/updatecashinbank/:id", updatecashinbank);

router.get("/dealer/deletecashincards/:id", deletecashincards);

module.exports = router;
