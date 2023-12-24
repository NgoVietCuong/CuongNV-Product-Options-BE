const optionSetService = require("../services/optionSetService");

async function findOptionSet() {

}

async function findAllOptionSets() {

}

async function createOptionSet(req, res) {
  const response = {
    statusCode: 500,
    message: "Internal Server Error"
  }

  const data = req.body;
  try {

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
  createOptionSet
}