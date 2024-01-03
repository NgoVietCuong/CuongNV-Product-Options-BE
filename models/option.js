const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  optionSetId: { type: mongoose.Types.ObjectId, required: true },
  label: { type: String, required: true },
  type: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5, 6] },
  order: { type: Number, required: true },
  textBox: { priceAddOn: Number },
  numberField: { priceAddOn: Number },
  checkbox: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: 0 } }],
  radioButton: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: 0 } }],
  dropdownMenu: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: 0 } }],
  // swatch: [{ _id: false, swatchType: { type: Number, default: 0, enum: [0, 1]}, optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: 0 } }],
  button: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: 0 } }],
}, {
  timestamps: false,
  versionKey: false
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;

