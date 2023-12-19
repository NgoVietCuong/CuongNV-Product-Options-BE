const { graphqlRequest } = require("../utils/axiosRequest");

async function getShopInfo(domain, accessToken, apiVersion) {
  const query = `
    query {
      shop {
        name
        email
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  const responseData = response.data.data.shop;
  return responseData;
}

async function getProductTags(domain, accessToken, apiVersion) {
  const query =  `
    query {
      shop {
        productTags(first: 250) {
          edges {
            node
          }
        }
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  console.log("productTags", response.data.extensions.cost)
  const responseData = response.data.data.shop.productTags.edges.map(item => item.node);
  return responseData;
}

async function getCustomerTags(domain, accessToken, apiVersion) {
  const query = `
    query {
      shop {
        customerTags(first: 250) {
          edges {
            node
          }
        }
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  console.log("customerTags", response.data.extensions.cost)
  const responseData = response.data.data.shop.customerTags.edges.map(item => item.node);
  return responseData;
}

module.exports = {
  getShopInfo,
  getProductTags,
  getCustomerTags
}