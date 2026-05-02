const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Province:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *     District:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         provinceCode:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District administration — can read all and write only Admin
 */

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: Get all districts 
 *     tags: [Districts]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a district 
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get((req, res) => res.json({ message: "All districts" }))
    .post((req, res) => res.json({ message: "District created" }));

/**
 * @swagger
 * /api/districts/{code}:
 *   get:
 *     summary: Get a single district by code
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   patch:
 *     summary: Update a district 
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a district 
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Deleted
 */
router.route('/:code')
    .get((req, res) => res.json({ message: "Single district" }))
    .patch((req, res) => res.json({ message: "District updated" }))
    .delete((req, res) => res.json({ message: "District deleted" }));

module.exports = router;