const express = require("express");
const router = express.Router();
const {
  addrsp,
  allrsp,
  getonersp,
  updatersp,
  deletersp,
  allrspApp,
} = require("../controllers/rsp");
router.post("/dealer/addrsp", addrsp);
router.get("/dealer/allrsp", allrsp);
router.get("/dealer/getonersp/:id", getonersp);

router.get("/dealer/allrspApp/:dealer_Id", allrspApp);

router.post("/dealer/updatersp/:id", updatersp);

router.get("/dealer/deletersp/:id", deletersp);

module.exports = router;
