const express = require("express");
const router = express.Router();
const { findAllOptionSets, createOptionSet } = require("../controller/optionSetController");

router.get("/", findAllOptionSets);
router.post("/", createOptionSet);

module.exports = router;