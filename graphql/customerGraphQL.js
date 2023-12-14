const axios = require("axios");

async function getCustomerList(domain, accessToken, apiVersion) {
  const query = `
    query {
      customers(first: 250) {
        edges {
          node {
            id,
            displayName,
            email
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

  const responseData = response.data.data.customers.edges;
  return responseData;
}

module.exports = {
  getCustomerList
}