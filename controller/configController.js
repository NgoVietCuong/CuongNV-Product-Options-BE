const shopService = require("../services/shopService");
const configService = require("../services/configService");

async function findConfig(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const { shopDomain } = req;

  try {
    const shop = await shopService.findByDomain(shopDomain);
    if (shop && shop._id) {
      const config = await configService.findOne(shop._id);
      if (config && config._id) {
        response.statusCode = 200;
        response.message = "OK";
        response.payload = config;
      } else {
        response.statusCode = 404;
        response.message = "Config Not Found";
      }
    } else {
      response.statusCode = 404;
      response.message = "Shop Not Found";
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function createConfig(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const data = req.body;

  try {
    const config = await configService.create(data);
    if (config && config._id) {
      response.statusCode = 201;
      response.message = "Created";
      response.payload = config;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function updateConfig(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopId, config } = req.body;
  
  try {
    const updatedConfig = await configService.update(shopId, config);
    if (updatedConfig && updatedConfig._id) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = updatedConfig;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
} 

module.exports = {
  findConfig, 
  createConfig,
  updateConfig
}