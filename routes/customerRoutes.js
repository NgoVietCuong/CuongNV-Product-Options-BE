const express = require("express");
const router = express.Router();
const { getStoreCustomers, getStoreCustomerTags } = require("../controller/customerController");

router.get("/list", getStoreCustomers);
router.get("/tags", getStoreCustomerTags);

module.exports = router;