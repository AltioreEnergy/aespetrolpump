const express = require("express");
const router = express.Router();

const {
  addonlinepyment,
  allonlinepyment,
  getoneonlinepyment,
  deleteonlinepyment,
  updateonlinepyment,
  allonlinepymentMApp,
} = require("../controllers/onlinepyment");

//Paths
router.post("/dealer/addonlinepyment", addonlinepyment);
router.get("/dealer/allonlinepyment", allonlinepyment);
router.get("/dealer/getoneonlinepyment/:id", getoneonlinepyment);
router.get("/dealer/allonlinepymentMApp/:dealer_Id", allonlinepymentMApp);
router.get("/dealer/deleteonlinepyment/:id", deleteonlinepyment);
router.post("/dealer/updateonlinepyment/:id", updateonlinepyment);

module.exports = router;
