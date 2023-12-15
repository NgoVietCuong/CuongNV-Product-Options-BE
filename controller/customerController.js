const shopGraphQL = require("../graphql/shopGraphQL");
const customerGraphQL = require("../graphql/customerGraphQL");
const { API_VERSION } = process.env;

async function getStoreCustomers(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;

  try {
    const customers = await customerGraphQL.getCustomerList(shopDomain, accessToken, API_VERSION);
    if (customers) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = customers;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function getStoreCustomerTags(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;

  try {
    const customerTags = await shopGraphQL.getCustomerTags(shopDomain, accessToken, API_VERSION);
    if (customerTags) {
      response.statusCode = 200;
      response.message = "OK";
      response.payload = customerTags;
    }    
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

module.exports = {
  getStoreCustomers,
  getStoreCustomerTags
}