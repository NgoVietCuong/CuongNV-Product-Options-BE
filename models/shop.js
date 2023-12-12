const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopDomain: { type: String, required: true},
  accessToken: { type: String, required: true},
}, {
  timestamps: true,
  versionKey: false
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;