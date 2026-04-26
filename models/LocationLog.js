const mongoose = require('mongoose');

const LocationLogSchema = new mongoose.Schema({
  tukTukId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TukTuk',
    required: true
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  province: { type: String },
  district: { type: String },
  speed: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LocationLog', LocationLogSchema);