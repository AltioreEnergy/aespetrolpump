const express = require("express");
const router = express.Router();
const {
    add_termscondition,
    edit_termscondition,
    viewonecondition,
    alltermscondition,
    deletecondition,
   
} = require("../controllers/terms_condition");
router.post("/admin/add_termscondition", add_termscondition);
router.post("/admin/edit_termscondition/:id", edit_termscondition);

router.get("/admin/viewonecondition/:id", viewonecondition);

router.get("/admin/alltermscondition", alltermscondition);

router.get("/admin/deletecondition/:id", deletecondition);
module.exports = router;
