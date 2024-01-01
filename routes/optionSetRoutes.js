const express = require("express");
const router = express.Router();
const { findOptionSet, findAllOptionSets, createOptionSet, updateOptionSet } = require("../controller/optionSetController");

router.get("/", findAllOptionSets);
router.get("/:id", findOptionSet);
router.post("/", createOptionSet);
router.put("/:id", updateOptionSet);

module.exports = router;