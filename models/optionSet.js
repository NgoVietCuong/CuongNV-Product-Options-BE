const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSetSchema = new Schema({
  shopId: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  priority: { type: Number, default: 0, required: true },
  status: { type: Boolean, default: true },
  applyToCustomer: { type: Number, enum: [0, 1, 2, 3, 4] },
  customerIds: { type: [Number] },
  customerTags: { type: [String] },
  applyToProduct: { type: Number, enum: [0, 1, 2, 3, 4] },
  productIds: { type: [Number] },
  productCollections: { type: [Number] },
  productTags: { type: [String] }
}, {
  timestamps: true,
  versionKey: false
});

const OptionSet = mongoose.model("OptionSet", optionSetSchema);

module.exports = OptionSet;