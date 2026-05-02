const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Police Stations
 *   description: Police station administration — read (all roles), write (HQ_ADMIN only)
 */

/**
 * @swagger
 * /api/police-stations:
 *   get:
 *     summary: Retrieve all police stations
 *     tags: [Police Stations]
 *     responses:
 *       200:
 *         description: A list of police stations.
 */
router.get('/', (req, res) => {
    res.json({ message: "Police stations list" });
});

module.exports = router;