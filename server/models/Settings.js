const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  address: String,
  ownerName: String,
  numInhabitants: Number,
  isSelected: { type: Boolean, default: false },
});

module.exports = mongoose.model('Settings', SettingsSchema);
