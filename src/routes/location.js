const express = require('express');
const router = express.Router();
const { protect, deviceOnly, officerOrAdmin } = require('../middleware/authMiddleware');
const locationController = require('../controllers/location.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     PoliceStation:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         districtCode:
 *           type: string
 *     LocationPing:
 *       type: object
 *       required:
 *         - tuktukId
 *         - latitude
 *         - longitude
 *       properties:
 *         tuktukId:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         timestamp:
 *           type: string
 *           format: date-time
 */

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

/**
 * @swagger
 * /api/locations/live:
 *   get:
 *     summary: Get live locations of all active TukTuks
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current active location data
 * 
 * /api/locations/history/{tukTukId}:
 *   get:
 *     summary: Get location history for a specific vehicle
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tukTukId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of historical GPS points
 */

router.post('/ping', protect, deviceOnly, locationController.pingLocation);
router.get('/live', protect, officerOrAdmin, locationController.getLiveLocations);
router.get('/history/:tukTukId', protect, officerOrAdmin, locationController.getLocationHistory);
//router.post('/ping', protect, deviceOnly, updateLocation);


module.exports = router;