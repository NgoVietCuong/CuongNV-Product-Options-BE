const shopModel = require("../models/shop");

function create(data) {
  const shop = new shopModel(data);
  return shop.save();
}

function update(domain, data) {
  
}

function findByDomain(domain) {
  return shopModel.findOne({ shopDomain: domain}).exec();
}

module.exports = {
  create,
  findByDomain
}