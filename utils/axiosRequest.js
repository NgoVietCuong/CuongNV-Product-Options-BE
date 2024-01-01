const axios = require("axios");

async function graphqlRequest(domain, accessToken, apiVersion, query) {
  const res = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: { query: query }
  });

  return res.data;
}

async function getThemeRequest(domain, accessToken, apiVersion) {
  const res = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/themes.json`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
  });

  return res.data;
}

async function getAssetsRequest(domain, accessToken, apiVersion, themeId) {
  const res = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/themes/${themeId}/assets.json`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
  });

  return res.data;
}

async function getContentRequest(domain, accessToken, apiVersion, themeId, assetKey) {
  const res = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/themes/${themeId}/assets.json?asset[key]=${assetKey}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
  });

  return res.data;
}

async function updateContentRequest(domain, accessToken, apiVersion, themeId, data) {
  const res = await axios({
    url: `https://${domain}/admin/api/${apiVersion}/themes/${themeId}/assets.json`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    data: data
  });

  return res.data;
}

module.exports = {
  graphqlRequest,
  getThemeRequest,
  getAssetsRequest,
  getContentRequest,
  updateContentRequest
}