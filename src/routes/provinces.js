const express = require('express');
const router = express.Router();

const provinces = [
  { code: 'WP', name: 'Western Province' },
  { code: 'CP', name: 'Central Province' },
  { code: 'SP', name: 'Southern Province' },
  { code: 'NW', name: 'North Western Province' },
  { code: 'NC', name: 'North Central Province' },
  { code: 'NP', name: 'Northern Province' },
  { code: 'EP', name: 'Eastern Province' },
  { code: 'UP', name: 'Uva Province' },
  { code: 'SG', name: 'Sabaragamuwa Province' }
];

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
 *       example:
 *         code: 'WP'
 *         name: 'Western Province'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Province'
 *             example:
 *               - code: 'WP'
 *                 name: 'Western Province'
 *               - code: 'CP'
 *                 name: 'Central Province'
 *               - code: 'SP'
 *                 name: 'Southern Province'
 *               - code: 'NW'
 *                 name: 'North Western Province'
 *               - code: 'NC'
 *                 name: 'North Central Province'
 *               - code: 'NP'
 *                 name: 'Northern Province'
 *               - code: 'EP'
 *                 name: 'Eastern Province'
 *               - code: 'UP'
 *                 name: 'Uva Province'
 *               - code: 'SG'
 *                 name: 'Sabaragamuwa Province'
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
    .get((req, res) => res.json(provinces))
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
    .get((req, res) => {
        const province = provinces.find(p => p.code === req.params.code);
        if (province) {
            res.json(province);
        } else {
            res.status(404).json({ message: "Province not found" });
        }
    })
    .patch((req, res) => res.json({ message: "Province updated" }))
    .delete((req, res) => res.json({ message: "Province deleted" }));

module.exports = router;