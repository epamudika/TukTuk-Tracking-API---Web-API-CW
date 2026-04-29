const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const { protect, officerOrAdmin } = require('../middleware/authMiddleware');

router.post('/ping', protect, locationController.pingLocation);
router.get('/live', protect, officerOrAdmin, locationController.getLiveLocations);
router.get('/history/:tukTukId', protect, officerOrAdmin, locationController.getLocationHistory);

module.exports = router;