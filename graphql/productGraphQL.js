const { graphqlRequest } = require("../utils/axiosRequest");

async function getProductList(domain, accessToken, apiVersion) {
  const query = `
    query {
      products (first: 250) {
        edges {
          node {
            id
            title
            handle,
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  console.log("products", response.data.extensions.cost)
  const responseData = response.data.data.products.edges.map(item => item.node);
  return responseData;
}

async function getCollections(domain, accessToken, apiVersion) {
  const query =  `
    query {
      collections(first: 250) {
        edges {
          node {
            id
            title
            image {
              url
            }
          }
        }
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  console.log("collections", response.data.extensions.cost)
  const responseData = response.data.data.collections.edges.map(item => item.node);
  return responseData;
}

module.exports = {
  getProductList,
  getCollections
}