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

module.exports = {
  getShopInfo
};