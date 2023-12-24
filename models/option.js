const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  optionSetId: { type: mongoose.Types.ObjectId, required: true },
  label: { type: String, required: true },
  type: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5, 6] },
  textBox: { priceAddOn: Number },
  numberField: { priceAddOn: Number },
  checkBox: [{ optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
  radioButton: [{ optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
  dropdownMenu: [{ optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
  swatch: [{ swatchType: { type: Number, default: 0, enum: [0, 1]}, optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
  button: [{ optionValue: { type: String, required: true }, priceAddOn: { type: Number, default: null } }],
}, {
  timestamps: false,
  versionKey: false
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;

