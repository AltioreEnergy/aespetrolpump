const express = require("express");
const router = express.Router();

const { verifyToken } = require("../functions/tokenverify");
const {
  signupsendotp,
  verifyotp,
  addeditbasicdealershipform,
  addeditadvancedealershipform,
  viewonedealershipform,
  alldealers,
  deletedealershipform,
  addmasterCompny,
  allMasterOilCompany,
  getdealer,
  addproduct,
  allproduct,
  addcapacity,
  allcapacity,
  //gettankmap,
  deleteproduct,
  addstate,
  adddistrict,
  getdistrict,
  getstate,
  deletestate,

  logout,
  addtankmap,
  alltankmap,
  addnozzlemap,
  allnozzle,
  updattankmap,
  updatnozzle,
  getonetank,
  getonenozzle,
  deletetankmap,
  deletenozzle,
  alltankmapApp,
  allnozzleApp,
  totaldealers,
} = require("../controllers/dealershipform");

//Paths
router.post("/dealer/signupsendotp", signupsendotp);
router.post("/dealer/verifyotp", verifyotp);
router.post(
  "/dealer/addeditbasicdealershipform/:id",
  addeditbasicdealershipform
);
//router.post("/dealer/addeditadvancedealershipform/:id", addeditadvancedealershipform);
//router.post("/dealer/addeditadvancedealershipform", addeditadvancedealershipform);
router.get("/dealer/viewonedealershipform/:id", viewonedealershipform);
router.get("/dealer/alldealers", alldealers);
//router.get("/dealer/getdealer/:id", getdealer);
router.get("/dealer/deletedealershipform/:id", deletedealershipform);
router.post("/dealer/addmasterCompny", addmasterCompny);
router.get("/dealer/allMasterOilCompany", allMasterOilCompany);
router.post("/dealer/addproduct", addproduct);
router.get("/dealer/allproduct", allproduct);
router.post("/dealer/addcapacity", addcapacity);
router.get("/dealer/allcapacity", allcapacity);
router.get("/dealer/allcapacity", allcapacity);
//router.get("/dealer/gettankmap/:id", gettankmap);
router.get("/dealer/logout", verifyToken, logout);
router.post("/dealer/addtankmap", addtankmap);
router.get("/dealer/alltankmap", alltankmap);
router.get("/dealer/alltankmapApp/:dealer_id", alltankmapApp);
router.get("/dealer/getonetank/:id", getonetank);
router.get("/dealer/deletetankmap/:id", deletetankmap);
router.post("/dealer/addnozzlemap", addnozzlemap);
router.get("/dealer/allnozzle", allnozzle);
router.get("/dealer/allnozzleApp/:dealer_id", allnozzleApp);
router.post("/dealer/updattankmap/:id", updattankmap);
router.post("/dealer/updatnozzle/:id", updatnozzle);
router.get("/dealer/getonenozzle/:id", getonenozzle);
router.get("/dealer/deletenozzle/:id", deletenozzle);
router.get("/dealer/totaldealers", totaldealers);
module.exports = router;
