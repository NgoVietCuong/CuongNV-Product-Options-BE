const express = require("express");
const router = express.Router();
const { findOptionSet, findAllOptionSets, createOptionSet, updateOptionSet, updateOptionSets, deleteOptionSets } = require("../controller/optionSetController");

router.get("/", findAllOptionSets);
router.get("/:id", findOptionSet);
router.post("/", createOptionSet);
router.put("/", updateOptionSets);
router.put("/delete", deleteOptionSets);
router.put("/:id", updateOptionSet);

module.exports = router;