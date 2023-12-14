const express = require("express");
const router = express.Router();
const { getStoreProducts, getStoreCollections, getStoreProductTags } = require("../controller/productController");

router.get("/list", getStoreProducts);
router.get("/collections", getStoreCollections);
router.get("/tags", getStoreProductTags);

module.exports = router;