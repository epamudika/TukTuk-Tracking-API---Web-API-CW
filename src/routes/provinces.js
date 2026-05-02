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
 *   name: Provinces
 *   description: Province administration — can read all and write only Admin
 */

/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: Get all provinces 
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a province 
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get((req, res) => res.json({ message: "All provinces" }))
    .post((req, res) => res.json({ message: "Province created" }));

/**
 * @swagger
 * /api/provinces/{code}:
 *   get:
 *     summary: Get a single province by code
 *     tags: [Provinces]
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
 *     summary: Update a province 
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a province 
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Deleted
 */
router.route('/:code')
    .get((req, res) => res.json({ message: "Single province" }))
    .patch((req, res) => res.json({ message: "Province updated" }))
    .delete((req, res) => res.json({ message: "Province deleted" }));

module.exports = router;