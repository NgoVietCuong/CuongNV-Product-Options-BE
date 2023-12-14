const express = require("express");
const shopRoutes = require("./shopRoutes");
const configRoutes = require("./configRoutes");
const productRoutes = require("./productRoutes");
const customerRoutes = require("./customerRoutes");
const validateRequest = require("../middlewares/validateRequest");

const routers = express.Router();
routers.use(validateRequest);
routers.use("/shops", shopRoutes);
routers.use("/configs", configRoutes);
routers.use("/products", productRoutes);
routers.use("/customers", customerRoutes);

module.exports = routers;