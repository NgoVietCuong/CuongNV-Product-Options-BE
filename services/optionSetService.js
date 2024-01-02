const optionSetModel = require("../models/optionSet");
const optionModel = require("../models/option");

function create(data) {
  const optionSet = new optionSetModel(data);
  return optionSet.save();
}

function update(id, data) {
  return optionSetModel.findByIdAndUpdate(id, data, { new: true });
}

function updateMany(ids, data) {
  return optionSetModel.updateMany({ _id: { $in: ids }}, data);
}

function deleteMany(ids) {
  
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
  updateMany,
  deleteMany,
  findAll,
  findById,
  findAllWithOptions
}