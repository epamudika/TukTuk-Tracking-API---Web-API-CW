const mongoose = require('mongoose');

const ProvinceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true }
});

module.exports = mongoose.model('Province', ProvinceSchema);