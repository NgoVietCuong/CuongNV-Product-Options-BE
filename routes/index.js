const express = require("express");
const validateRequest = require("../middlewares/validateRequest");
const shopRoutes = require("./shopRoutes");

const routers = express.Router();
routers.use(validateRequest);
routers.use('/shops', shopRoutes);

module.exports = routers;