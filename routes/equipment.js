const express = require("express");
const router = express.Router();

const {
  addequipment,
  editequipment,
  viewoneequipment,
  allequipment,
  allequipmentofdealer,
  deleteequipment,
} = require("../controllers/equipment");

//Paths
router.post("/admin/addequipment/:id", addequipment);
router.post("/admin/editequipment/:id", editequipment);
router.get("/admin/viewoneequipment/:id", viewoneequipment);
router.get("/admin/allequipment", allequipment);
router.get("/admin/allequipmentofdealer/:id", allequipmentofdealer);
router.get("/admin/deleteequipment/:id", deleteequipment);

module.exports = router;
