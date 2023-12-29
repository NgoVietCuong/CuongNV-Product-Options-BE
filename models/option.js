const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  label: { type: String, required: true },
  type: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5, 6] },
  order: { type: Number, required: true },
  textBox: { priceAddOn: Number },
  numberField: { priceAddOn: Number },
  checkbox: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: null } }],
  radioButton: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: null } }],
  dropdownMenu: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: null } }],
  // swatch: [{ _id: false, swatchType: { type: Number, default: 0, enum: [0, 1]}, optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
  button: [{ _id: false, optionValue: { type: String }, priceAddOn: { type: Number, default: null } }],
}, {
  timestamps: false,
  versionKey: false
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;

