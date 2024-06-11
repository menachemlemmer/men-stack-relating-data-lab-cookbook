const express = require("express");
const router = express.Router();
const foodCtrl = require("../controllers/foods");

router.get("/:userId/foods", foodCtrl.index);

router.get("/:userId/foods/new", foodCtrl.new);

router.post("/:userId/foods", foodCtrl.create);

router.get("/:userId/foods/:foodId", foodCtrl.show);

router.delete("/:userId/foods/:foodId", foodCtrl.delete);

router.get("/:userId/foods/:foodId/edit", foodCtrl.edit);

router.put("/:userId/foods/:foodId", foodCtrl.update);

module.exports = router;
