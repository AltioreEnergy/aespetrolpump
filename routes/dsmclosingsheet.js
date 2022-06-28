const express = require("express");
const router = express.Router();
const {
    adddsmclosing,
    alldsmclosing,
    getonedsmclosing,
    deletedsmclosing,
    updatedsmclosing,
    alldsmclosingApp
  } = require("../controllers/dsmclosingsheet");
 router.post("/dealer/adddsmclosing",adddsmclosing);
router.get("/dealer/alldsmclosing", alldsmclosing);
router.get("/dealer/getonedsmclosing/:id", getonedsmclosing);
router.get("/dealer/alldsmclosingApp/:dealer_name1", alldsmclosingApp);
router.get("/dealer/deletedsmclosing/:id", deletedsmclosing);

router.post("/dealer/updatedsmclosing/:id", updatedsmclosing);

module.exports = router;