const { graphqlRequest } = request("../utils/axiosRequest");

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

  const response = graphqlRequest(domain, accessToken, apiVersion, query);
  const responseData = response.data.data.products.edges;
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

  const response = graphqlRequest(domain, accessToken, apiVersion, query);
  const responseData = response.data.data.collections.edges;
  return responseData;
}

module.exports = {
  getProductList,
  getCollections
}