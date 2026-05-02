const express = require('express');
const router = express.Router();

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
 * tags:
 *   name: Police Stations
 *   description: Police station administration — can read all and write only Admin
 */

/**
 * @swagger
 * /api/police-stations:
 *   get:
 *     summary: Get all police stations
 *     tags: [Police Stations]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a police station 
 *     tags: [Police Stations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get((req, res) => res.json({ message: "All police stations" }))
    .post((req, res) => res.json({ message: "Station created" }));

module.exports = router;