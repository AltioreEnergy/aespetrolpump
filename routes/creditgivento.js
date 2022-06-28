const express = require("express");
const router = express.Router();

const {
  addcreditgiven,
  searchnameCoustomer,
  searchvhicalCoustomer,
  allcreditgiven,
  getonecreditgiven,
  updatecreditgiven,
  deletecreditgiven,
  allcreditgivenApp,
  allcreditManagmentApp,
} = require("../controllers/creditgivento");

//Paths
router.post("/dealer/addcreditgiven", addcreditgiven);
router.post("/dealer/searchnameCoustomer", searchnameCoustomer);
router.post("/dealer/searchvhicalCoustomer", searchvhicalCoustomer);
router.get("/dealer/allcreditgiven", allcreditgiven);
router.get("/dealer/getonecreditgiven/:id", getonecreditgiven);
router.get("/dealer/allcreditgivenApp/:dealer_Id", allcreditgivenApp);
router.get("/dealer/allcreditManagmentApp/:dealer_Id", allcreditManagmentApp);
router.post("/dealer/updatecreditgiven/:id", updatecreditgiven);
router.get("/dealer/deletecreditgiven/:id", deletecreditgiven);
module.exports = router;
