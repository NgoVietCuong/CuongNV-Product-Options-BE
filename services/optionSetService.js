const optionSetModel = require("../models/optionSet");

function create(data) {
  const optionSet = new optionSetModel(data);
  return optionSet.save();
}

function findAll(shopId) {
  return optionSetModel.find({ shopId: shopId }).sort({ updatedAt: -1 }).exec();
}

module.exports = {
  create,
  findAll
}