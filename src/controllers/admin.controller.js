const User = require('../models/User');
const TukTuk = require('../models/TukTuk');
const LocationLog = require('../models/LocationLog');

// GET dashboard summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const totalTukTuks = await TukTuk.countDocuments();
    const activeTukTuks = await TukTuk.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments();
    const totalPings = await LocationLog.countDocuments();

    res.status(200).json({
      totalTukTuks,
      activeTukTuks,
      inactiveTukTuks: totalTukTuks - activeTukTuks,
      totalUsers,
      totalPings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET stats by province
exports.getStatsByProvince = async (req, res) => {
  try {
    const stats = await TukTuk.aggregate([
      { $group: { _id: '$province', count: { $sum: 1 } } }
    ]);
    res.status(200).json({ data: stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};