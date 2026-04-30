const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const { protect, officerOrAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/locations/ping:
 *   post:
 *     summary: Send GPS location ping
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tukTukId:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Location saved
 */

router.post('/ping', protect, locationController.pingLocation);
router.get('/live', protect, officerOrAdmin, locationController.getLiveLocations);
router.get('/history/:tukTukId', protect, officerOrAdmin, locationController.getLocationHistory);

module.exports = router;