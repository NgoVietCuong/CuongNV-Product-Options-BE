const express = require("express");
const router = express.Router();
const { findShop, createShop, updateShop } = require("../controller/shopController");

router.get("/", findShop);
router.put("/", updateShop);
router.post("/", createShop);

module.exports = router;