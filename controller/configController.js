const configService = require("../services/configService");

async function findConfig() {

}

async function createConfig(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }
  const data = req.body;

  try {
    const config = configService.create(data);
    if (config && config._id) {
      response.statusCode = 201;
      response.message = "Created";
      response.payload = config;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function updateConfig() {

}

module.exports = {
  findConfig, 
  createConfig,
  updateConfig
}