const shopService = require("../services/shopService");
const shopGraphQL = require("../graphql/shopGraphQL");
const { API_VERSION } = process.env;

async function createShop(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const { shopDomain, accessToken } = req;

  try {
    const shop = await shopService.create({ shopDomain, accessToken });
    if (shop && shop._id) {
      response.statusCode = 201;
      response.message = "Created";
      response.payload = shop ;
    }
  } catch (e) {
    console.log("Error", e)
  } finally {
    res.send(response);
  }
}

async function findShop(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const { shopDomain, accessToken } = req;

  try {
    const shop = await shopService.findByDomain(shopDomain);
    if (shop && shop._id) {
      const shopInfo = await shopGraphQL.getShopInfo(shopDomain, accessToken, API_VERSION);
      response.statusCode = 200;
      response.message = "OK";
      response.payload = {...shop, ...shopInfo};
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

async function updateShop(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const { shopDomain, accessToken } = req;

  try {
    const shop = await shopService.update(shopDomain, { accessToken });
    if (shop) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = shop;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

module.exports = {
  findShop,
  createShop,
  updateShop,
}