const express = require("express")
const router = express.Router()

const {addcity,editcity,allcity,onecity,deletecity}= require("../controllers/city")

// router.post("/admin/addcity", addcity)
// router.post("/admin/editcity/:id", editcity)
router.post("/admin/allcity", allcity)
// router.get("/admin/onecity/:id", onecity)
// router.delete("/admin/deletecity/:id", deletecity)
//
module.exports = router