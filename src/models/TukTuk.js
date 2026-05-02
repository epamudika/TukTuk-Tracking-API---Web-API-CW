const mongoose = require('mongoose');

const TukTukSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  driverNIC: { type: String, required: true },
  phone: { type: String },
  province: { type: String, required: true },
  district: { type: String, required: true },
  policeStation: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TukTuk', TukTukSchema);