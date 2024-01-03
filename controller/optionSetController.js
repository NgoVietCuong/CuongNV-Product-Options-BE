const shopService = require("../services/shopService");
const optionService = require("../services/optionService");
const optionSetService = require("../services/optionSetService");

async function findOptionSet(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { shopDomain } = req;
  const id = req.params.id;

  try {
    const shop = await shopService.findByDomain(shopDomain);
    if (shop && shop._id) {
      const optionSet = await optionSetService.findById(id);
      if (optionSet && optionSet._id) {
        response.statusCode = 200;
        response.message = "OK";
        response.payload = optionSet;
      } else {
        response.statusCode = 404;
        response.message = "Option Set Not Found"
      }
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
      const newOptions = options.map(option => { return {...option, optionSetId: optionSet._id} });
      await optionService.bulkCreate(newOptions, optionSet._id);
      response.statusCode = 201;
      response.message = "Created";
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function updateOptionSet(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const id = req.params.id;
  const { options, ...data } = req.body;

  try {
    const optionSet = await optionSetService.update(id, data);
    if (optionSet && optionSet._id) {
      if (options && options.length) {
        const newOptions = options.map(option => { return {...option, optionSetId: optionSet._id} });
        await optionService.bulkUpdate(newOptions, optionSet);
      }
      response.statusCode = 200;
      response.message = "Updated";
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function updateOptionSets(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { ids, ...data } = req.body;

  try {
    const updatedOptionSets = await optionSetService.updateMany(ids, data);
    if (updatedOptionSets) {
      response.statusCode = 200;
      response.message = "Updated";
    }
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

async function deleteOptionSets(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const { ids } = req.body;

  try {
    await optionSetService.deleteMany(ids);
    await optionService.bulkDelete(ids);
    response.statusCode = 200;
    response.message = "Updated";
  } catch (e) {
    console.log("Error", e);
  } finally {
    res.send(response);
  }
}

module.exports = {
  findOptionSet,
  findAllOptionSets,
  createOptionSet,
  updateOptionSet,
  updateOptionSets,
  deleteOptionSets
}