const express = require("express");
const router = express.Router();
const {
  addcashcollected,
  allcashcollected,
  getonecashcollected,
  deletecashcollected,
  updatecashcollected,
  allcashcollectedApp,
} = require("../controllers/cashcollected");

router.post("/dealer/addcashcollected", addcashcollected);
router.get("/dealer/allcashcollected", allcashcollected);

router.post("/dealer/updatecashcollected/:id", updatecashcollected);

router.get("/dealer/getonecashcollected/:id", getonecashcollected);
router.get("/dealer/allcashcollectedApp/:dealer_name", allcashcollectedApp);

router.get("/dealer/deletecashcollected/:id", deletecashcollected);

module.exports = router;
