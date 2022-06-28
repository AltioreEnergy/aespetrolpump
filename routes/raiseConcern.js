const express = require("express");
const router = express.Router();

const {
  addraiseConcern,
  allraiseConcern,
  getoneraiseConcern,
  deleteraiseConcern,
  updateraiseConcern,
  allraiseConcernApp,
} = require("../controllers/raiseConcern");

//Paths
router.post("/dealer/addraiseConcern", addraiseConcern);
router.get("/dealer/allraiseConcern", allraiseConcern);
router.get("/dealer/getoneraiseConcern/:id", getoneraiseConcern);
router.get("/dealer/allraiseConcernApp/:dealer_Id", allraiseConcernApp);
router.get("/dealer/deleteraiseConcern/:id", deleteraiseConcern);
router.post("/dealer/updateraiseConcern/:id", updateraiseConcern);

module.exports = router;
