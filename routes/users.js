const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

router.get("/", userCtrl.index);

router.get("/:userId/", userCtrl.show);

module.exports = router;
