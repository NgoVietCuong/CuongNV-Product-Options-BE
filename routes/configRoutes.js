const express = require("express");
const router = express.Router();
const { findConfig, createConfig, updateConfig } = require("../controller/configController");

router.get("/", findConfig);
router.put("/", updateConfig);
router.post("/", createConfig);

module.exports = router;