const mongoose = require('mongoose');

const PoliceStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    districtCode: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PoliceStation', PoliceStationSchema);