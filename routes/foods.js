const express = require("express");
const router = express.Router();
const foodCtrl = require("../controllers/foods");

router.get("/", foodCtrl.index);

router.get("/new", foodCtrl.new);

router.post("/", foodCtrl.create);

router.get("/:foodId", foodCtrl.show);

router.delete("/:foodId", foodCtrl.delete);

router.get("/:foodId/edit", foodCtrl.edit);

router.put("/:foodId", foodCtrl.update);

module.exports = router;
