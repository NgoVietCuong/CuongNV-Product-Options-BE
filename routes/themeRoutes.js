const express = require("express");
const router = express.Router();
const { updateTheme } = require("../controller/themeController");

router.put("/", updateTheme);

module.exports = router;