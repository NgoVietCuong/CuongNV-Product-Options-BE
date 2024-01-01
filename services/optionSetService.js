const optionSetModel = require("../models/optionSet");

function create(data) {
  const optionSet = new optionSetModel(data);
  return optionSet.save();
}

function update(id, data) {
  return optionSetModel.findByIdAndUpdate(id, data, { new: true });
}

function findAll(shopId) {
  return optionSetModel.find({ shopId: shopId }).sort({ updatedAt: -1 }).exec();
}

function findAllWithOptions(shopId) {
  return optionSetModel.find({ shopId: shopId }).populate("options").sort({ priority: 1, createdAt: 1 }).exec();
}

function findById(id) {
  return optionSetModel.findById(id).populate("options").exec();
}

module.exports = {
  create,
  update,
  findAll,
  findById,
  findAllWithOptions
}