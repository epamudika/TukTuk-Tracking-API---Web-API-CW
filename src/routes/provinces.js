const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Provinces
 *   description: Province administration — read (all roles), write (HQ_ADMIN only)
 */

/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: List of all provinces
 */
router.get('/', (req, res) => {
    // Logic to return provinces from your database
    res.json({ message: "List of provinces" });
});

module.exports = router;