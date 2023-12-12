const express = require("express");
const shopRoutes = require("./shopRoutes");
const configRoutes = require("./configRoutes");
const validateRequest = require("../middlewares/validateRequest");

const routers = express.Router();
routers.use(validateRequest);
routers.use("/shops", shopRoutes);
routers.use("/configs", configRoutes);

module.exports = routers;