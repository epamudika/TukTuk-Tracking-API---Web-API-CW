const LocationLog = require('../models/LocationLog');
const TukTuk = require('../models/TukTuk');

// POST - tuk-tuk sends GPS ping
exports.pingLocation = async (req, res) => {
  try {
    const { tukTukId, latitude, longitude, province, district, speed } = req.body;

    const log = new LocationLog({
      tukTukId,
      latitude,
      longitude,
      province,
      district,
      speed: speed || 0, // Ensure speed is captured for police reports
      timestamp: new Date()
    });

    await log.save();
    res.status(201).json({
      message: 'Location saved successfully',
      data: log
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - live location of all tuk-tuks
exports.getLiveLocations = async (req, res) => {
  try {
    const { province, district } = req.query;
    let filter = {};

    if (province) filter.province = province;
    if (district) filter.district = district;

    const tuktuks = await TukTuk.find(filter);
    const liveLocations = [];

    for (const tuktuk of tuktuks) {
      const latest = await LocationLog.findOne({
        tukTukId: tuktuk._id
      }).sort({ timestamp: -1 });

      if (latest) {
        liveLocations.push({
          tuktuk: tuktuk.registrationNumber,
          driver: tuktuk.driverName,
          province: tuktuk.province,
          district: tuktuk.district,
          latitude: latest.latitude,
          longitude: latest.longitude,
          speed: latest.speed,
          lastSeen: latest.timestamp
        });
      }
    }

    res.status(200).json({
      count: liveLocations.length,
      data: liveLocations
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - location history for one tuk-tuk
exports.getLocationHistory = async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = { tukTukId: req.params.tukTukId };

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const history = await LocationLog.find(filter).sort({ timestamp: -1 });

    res.status(200).json({
      count: history.length,
      data: history
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};