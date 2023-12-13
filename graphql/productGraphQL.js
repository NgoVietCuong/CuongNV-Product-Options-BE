const axios = require("axios");

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

  const response = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

  const responseData = response.data;
  console.log('test', responseData);
  return responseData;
}

async function getCollections(domain, accessToken, apiVersion) {

}

async function getProductTags(domain, accessToken, apiVersion) {

}

module.exports = {
  getProductList,
  getCollections,
  getProductTags
}