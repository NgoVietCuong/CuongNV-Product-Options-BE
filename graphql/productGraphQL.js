const { graphqlRequest } = require("../utils/axiosRequest");

async function getProductList(domain, accessToken, apiVersion) {
  const query = `
    query {
      products (first: 250) {
        edges {
          node {
            id
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const response = await graphqlRequest(domain, accessToken, apiVersion, query);
  const responseData = response.data.products.edges.map(item => item.node);
  const productData = responseData.map(item => {
    let idArray = item.id.split("/");
    return {
      ...item,
      id: idArray.pop()
    }
  })
  return productData;
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
  const responseData = response.data.collections.edges.map(item => item.node);
  const collectionData = responseData.map(item => {
    let idArray = item.id.split("/");
    return {
      ...item,
      id: idArray.pop()
    }
  })
  return collectionData;
}

module.exports = {
  getProductList,
  getCollections
}