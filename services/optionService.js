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

module.exports = {
  bulkCreate
}