const express = require("express");
const router = express.Router();
const {
  addlubricantStock,
  alllubricantStock,
  getonelubricantStock,
  deletelubricantStock,
  updatelubricantStock,
  alllubricantStockApp,
} = require("../controllers/lubricantStock");

router.post("/dealer/addlubricantStock", addlubricantStock);
router.get("/dealer/alllubricantsales", alllubricantStock);

router.post("/dealer/updatelubricantStock/:id", updatelubricantStock);

router.get("/dealer/getonelubricantStock/:id", getonelubricantStock);

router.get("/dealer/deletelubricantStock/:id", deletelubricantStock);

router.get("/dealer/alllubricantStockApp/:dealer_Id", alllubricantStockApp);
module.exports = router;
