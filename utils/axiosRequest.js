const axios = require("axios");

async function graphqlRequest(domain, accessToken, apiVersion, query) {
  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

  return response.data;
}

module.exports = {
  graphqlRequest
}