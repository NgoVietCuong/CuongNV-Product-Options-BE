const axios = require("axios");

function graphqlRequest(domain, accessToken, apiVersion, query) {
  return axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });
}

module.exports = {
  graphqlRequest
}