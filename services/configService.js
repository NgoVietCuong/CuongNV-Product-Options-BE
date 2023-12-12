const configModel = require('../models/config');

function create(data) {
  const config = new configModel(data);
  return config.save();
}

function update(shopId, data) {
  return configModel.updateOne({ shopId: shopId }, data);
}

function findOne(shopId) {
  return configModel.findOne({ shopId: shopId}).lean().exec();
}

module.exports = {
  create,
  update, 
  findOne
}