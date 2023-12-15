const { graphqlRequest } = require("../utils/axiosRequest");

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

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  const responseData = response.data.data.customers.edges.map(item => item.node);
  return responseData;
}

module.exports = {
  getCustomerList
}