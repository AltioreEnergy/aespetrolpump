const express = require("express");
const router = express.Router();
const {
  addmembershipplan,
  allmembershipplan,
  allmembershipplanApp,
  deletemembership,
  viewonemembership,
  updatemembership,
  total7sayplan,
  totalvasicplan,
  totalendtoendplan,
  total7dayplanearnig,
  totalbasicplanearning,
  endtoendearning,
} = require("../controllers/membershipplan");

router.post("/dealer/addmembershipplan", addmembershipplan);
router.get("/dealer/allmembershipplan", allmembershipplan);
router.post("/dealer/updatemembership/:id", updatemembership);
router.get("/dealer/viewonemembership/:id", viewonemembership);

router.get("/dealer/allmembershipplanApp/:dealer_id", allmembershipplanApp);

router.get("/dealer/deletemembership/:id", deletemembership);
router.get("/dealer/total7sayplan", total7sayplan);
router.get("/dealer/totalvasicplan", totalvasicplan);
router.get("/dealer/totalendtoendplan", totalendtoendplan);
router.get("/dealer/total7dayplanearnig", total7dayplanearnig);
router.get("/dealer/totalbasicplanearning", totalbasicplanearning);
router.get("/dealer/endtoendearning", endtoendearning);
module.exports = router;
