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
  console.log("customer", response.data.extensions.cost)
  const responseData = response.data.data.customers.edges.map(item => item.node);
  const customerData = responseData.map(item => {
    let idArray = item.id.split("/");
    return {
      ...item,
      id: idArray.pop()
    }
  })
  return customerData;
}

module.exports = {
  getCustomerList
}