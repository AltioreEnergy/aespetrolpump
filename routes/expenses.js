const express = require("express");
const router = express.Router();
const {
  addexpenses,
  allexpenses,
  getoneexpenses,
  deleteexpenses,
  updateexpenses,
  allexpensesApp,
} = require("../controllers/expenses");

router.post("/dealer/addexpenses", addexpenses);
router.get("/dealer/allexpenses", allexpenses);

router.post("/dealer/updateexpenses/:id", updateexpenses);

router.get("/dealer/getoneexpenses/:id", getoneexpenses);

router.get("/dealer/allexpensesApp/:dealer_Id", allexpensesApp);

router.get("/dealer/deleteexpenses/:id", deleteexpenses);

module.exports = router;
