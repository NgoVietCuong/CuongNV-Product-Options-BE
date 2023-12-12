const shopModel = require("../models/shop");

function create(data) {
  const shop = new shopModel(data);
  return shop.save();
}

function update(domain, data) {
  return shopModel.updateOne({ shopDomain: domain }, data);
}

function findByDomain(domain) {
  return shopModel.findOne({ shopDomain: domain}).lean().exec();
}

module.exports = {
  create,
  update,
  findByDomain
}