const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District administration — read (all roles), write (HQ_ADMIN only)
 */

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: Retrieve all districts
 *     tags: [Districts]
 *     responses:
 *       200:
 *         description: A list of districts.
 */
router.get('/', (req, res) => {
    // This is where you would call your District model
    res.json({ message: "Districts list" });
});

module.exports = router;