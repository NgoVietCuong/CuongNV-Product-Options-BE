const axios = require("axios");

async function getShopInfo(domain, accessToken, apiVersion) {
  const query = `
    query {
      shop {
        name
        email
      }
    }
  `;

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

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

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

  const responseData = response.data.data.shop.edges;
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

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

  const responseData = response.data.data.shop.edges;
  return responseData;
}

module.exports = {
  getShopInfo,
  getProductTags,
  getCustomerTags
}