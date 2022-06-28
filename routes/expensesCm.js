const express = require("express");
const router = express.Router();

const {
  addexpensesCm,
  allexpensesCmApp,
  allexpensesCm,
  getoneexpensesCm,
  deleteexpensesCm,
  updateexpensesCm,
} = require("../controllers/expensesCm");

router.post("/dealer/addexpensesCm", addexpensesCm);

router.get("/dealer/allexpensesCm", allexpensesCm);
router.get("/dealer/getoneexpensesCm/:id", getoneexpensesCm);
router.get("/dealer/allexpensesCmApp/:dealer_Id", allexpensesCmApp);
router.post("/dealer/updateexpensesCm/:id", updateexpensesCm);

router.get("/dealer/deleteexpensesCm/:id", deleteexpensesCm);

module.exports = router;
