const express = require("express");
const router = express.Router();
const { createOptionSet } = require("../controller/optionSetController");

router.post("/", createOptionSet);

module.exports = router;