const optionSetModel = require("../models/optionSet");

function create(data) {
  const optionSet = new optionSetModel(data);
  return optionSet.save();
}

module.exports = {
  create
}