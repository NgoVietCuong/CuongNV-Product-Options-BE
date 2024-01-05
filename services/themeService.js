const fs = require("fs");
const configService = require("./configService");
const optionSetService = require("./optionSetService");
const { getThemeRequest, getContentRequest, updateContentRequest } = require("../utils/axiosRequest");

async function getThemeId(shopDomain, accessToken, apiVersion) {
  const themeData = await getThemeRequest(shopDomain, accessToken, apiVersion);
  const mainTheme = themeData.themes.find(theme => theme.role === "main");
  const themeId = mainTheme.id;
  return themeId;
}

async function updateThemeContent(shopDomain, accessToken, apiVersion, themeId) {
  const contentData = await getContentRequest(shopDomain, accessToken, apiVersion, themeId, "layout/theme.liquid");
  const fileContent = contentData.asset.value;

  if (fileContent && !fileContent.includes("{% include 'hoa-po-header' %}{% include 'hoa-po-js' %}")) {
    const newContent = fileContent.replace("</head>", "{% include 'hoa-po-header' %}{% include 'hoa-po-js' %}</head>");
    const data = {
      asset: {
        key: "layout/theme.liquid",
        value: newContent
      }
    }
    updateContentRequest(shopDomain, accessToken, apiVersion, themeId, data);
  }
}

async function uploadSnippetFile(shopDomain, accessToken, apiVersion, themeId, filePath) {
  fs.readFile(filePath, "utf8", (e, content) => {
    if (e) {
      console.log("Error", e);
      return;
    }
    const data = {
      asset: {
        key: `snippets/${filePath.split("/")[1]}`,
        value: content
      }
    }
    updateContentRequest(shopDomain, accessToken, apiVersion, themeId, data);
  })
}

async function uploadConfigData(shopDomain, accessToken, apiVersion, themeId, shopId) {
  const config = await configService.findOne(shopId);
  const optionSets = await optionSetService.findAllWithOptions(shopId);

  const scriptContent = `
    \n<script id="hoa-po-config-data">
      if (typeof HOA_PO === "undefined") {
        var HOA_PO = {};
      }

      HOA_PO.appStatus = ${config.appStatus};
      HOA_PO.editInCart = ${config.editInCart};
      HOA_PO.priceAddOns = ${config.priceAddOns};
      HOA_PO.optionSets = optionSetData;
    </script>\n
  `;
  let fileContent = fs.readFileSync("public/hoa-po-header.liquid", "utf8");
  const scriptRegex = /<script id="hoa-po-config-data">([\s\S]*?)<\/script>/;
  const scriptExists = scriptRegex.test(fileContent);
  if (scriptExists) {
    fileContent = fileContent.replace(scriptRegex, scriptContent);
  } else {
    fileContent = fileContent + scriptContent;
  }

  const headerData = {
    asset: {
      key: `snippets/hoa-po-header.liquid`,
      value: fileContent
    }
  }

  const content = `let optionSetData = ${JSON.stringify(optionSets)}`;
  const configData = {
    asset: {
      key: `assets/hoa-po-option-set-data.js`,
      value: content
    }
  }
  updateContentRequest(shopDomain, accessToken, apiVersion, themeId, headerData);
  updateContentRequest(shopDomain, accessToken, apiVersion, themeId, configData);
}

async function uploadJSFile(shopDomain, accessToken, apiVersion, themeId, filePath) {
  fs.readFile(filePath, "utf8", (e, content) => {
    if (e) {
      console.log("Error", e);
      return;
    }
    const data = {
      asset: {
        key: `assets/${filePath.split("/")[1]}`,
        value: content
      }
    }
    updateContentRequest(shopDomain, accessToken, apiVersion, themeId, data);
  })
}

module.exports = {
  getThemeId,
  updateThemeContent,
  uploadSnippetFile,
  uploadConfigData,
  uploadJSFile
}