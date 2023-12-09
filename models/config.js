const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  shopId: { type: mongoose.Types.ObjectId, required: true },
  appStatus: { type: Boolean, default: false },
  editInCart: { type: Boolean, default: false },
  priceAddOns: { type: Boolean, default: false }
}, {
  timestamps: false,
  versionKey: false
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;