const fs = require("fs");
const themeService = require("../services/themeService");
const { API_VERSION } = process.env;

async function updateTheme(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain, accessToken } = req;
  const { shopId } = req.body;

  try {
    const themeId = await themeService.getThemeId(shopDomain, accessToken, API_VERSION);
    await Promise.all([
      themeService.updateThemeContent(shopDomain, accessToken, API_VERSION, themeId),
      themeService.uploadSnippetFile(shopDomain, accessToken, API_VERSION, themeId, "public/hoa-po-js.liquid"),
      themeService.uploadConfigData(shopDomain, accessToken, API_VERSION, themeId, shopId),
      themeService.uploadJSFile(shopDomain, accessToken, API_VERSION, themeId, "public/hoa-po-js.js")
    ]);
    
    response.statusCode = 200;
    response.message = "OK";
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

module.exports = {
  updateTheme
}