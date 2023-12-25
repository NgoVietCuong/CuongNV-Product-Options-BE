const shopService = require("../services/shopService");
const optionService = require("../services/optionService");
const optionSetService = require("../services/optionSetService");

async function findOptionSet() {

}

async function findAllOptionSets(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain } = req;

  try {
    const shop = await shopService.findByDomain(shopDomain);
    if (shop && shop._id) {
      const optionSets = await optionSetService.findAll(shop._id);
      response.statusCode = 200;
      response.message = "OK";
      response.payload = optionSets;
    } else {
      response.statusCode = 404;
      response.message = "Shop Not Found";
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function createOptionSet(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { options, ...data } = req.body;

  try {
    const optionSet = await optionSetService.create(data);
    if (optionSet && optionSet._id) {
      await optionService.bulkCreate(options, optionSet._id);
      response.statusCode = 201;
      response.message = "Created";
      response.payload = optionSet;
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function updateOptionSet() {

}

async function duplicateOptionSets() {

}

async function deleteOptionSets() {

}

module.exports = {
  findAllOptionSets,
  createOptionSet
}