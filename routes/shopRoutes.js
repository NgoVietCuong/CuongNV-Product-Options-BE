const express = require("express");
const router = express.Router();
const { createShop, findShop } = require("../controller/shopController");

router.get("/", findShop);
router.post("/", createShop);

module.exports = router;