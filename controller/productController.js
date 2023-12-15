const shopGraphQL = require("../graphql/shopGraphQL");
const productGraphQL = require("../graphql/productGraphQL");
const { API_VERSION } = process.env;

async function getStoreProducts(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;

  try {
    const products = await productGraphQL.getProductList(shopDomain, accessToken, API_VERSION);
    if (products) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = products;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function getStoreCollections(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;

  try {
    const collections = await productGraphQL.getCollections(shopDomain, accessToken, API_VERSION);
    if (collections) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = collections;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function getStoreProductTags(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;

  try {
    const productTags = await shopGraphQL.getProductTags(shopDomain, accessToken, API_VERSION);
    if (productTags) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = productTags;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

module.exports = {
  getStoreProducts,
  getStoreCollections,
  getStoreProductTags
}