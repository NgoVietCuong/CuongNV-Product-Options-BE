const configModel = require('../models/config');

function create(data) {
  const config = new configModel(data);
  return config.save();
}

function update() {

}

function findOne() {

}

module.exports = {
  create,
  update, 
  findOne
}