const optionModel = require("../models/option");
const optionSetModel = require("../models/optionSet");

async function bulkCreate(data, optionSetId) {
  const saveOptions = await optionModel.insertMany(data);
  saveOptions.forEach(async (option) => {
    await optionSetModel.findByIdAndUpdate(
      optionSetId,
      { $push: { options: option._id }},
      { new: true }
    );
  })
  return saveOptions;
}

async function bulkUpdate(data, optionSetId) {
  const beforeOptionSet = await optionSetModel.findByIdAndUpdate(optionSetId, { options: [] });
  const optionIds = beforeOptionSet.options;
  await optionModel.deleteMany({
    _id: { $in: optionIds }
  });
  await bulkCreate(data, optionSetId);
}

function bulkDelete(ids) {
  return optionModel.deleteMany({ optionSetId: { $in: ids }});
}

module.exports = {
  bulkCreate,
  bulkUpdate,
  bulkDelete
}