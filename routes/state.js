const express = require("express")
const router = express.Router()

const {addstate,editstate,allstate,onestate,deletestate} = require("../controllers/state")

//router.post("/admin/addstate", addstate)
// router.post("/admin/editstate/:id", editstate)
router.post("/admin/allstate", allstate)
// router.get("/admin/onestate/:id", onestate)
// router.delete("/admin/deletestate/:id", deletestate)
//console
module.exports = router