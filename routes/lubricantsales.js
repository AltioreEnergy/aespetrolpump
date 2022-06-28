const express = require("express");
const router = express.Router();
const {
  addlubricantsales,
  alllubricantsales,
  getonelubricantsales,
  deletelubricantsales,
  updatelubricantsales,
  alllubricantsalesApp,
} = require("../controllers/lubricantsales");

router.post("/dealer/addlubricantsales", addlubricantsales);
router.get("/dealer/alllubricantsales", alllubricantsales);

router.post("/dealer/updatelubricantsales/:id", updatelubricantsales);

router.get("/dealer/getonelubricantsales/:id", getonelubricantsales);

router.get("/dealer/deletelubricantsales/:id", deletelubricantsales);

router.get("/dealer/alllubricantsalesApp/:dealer_name1", alllubricantsalesApp);
module.exports = router;
