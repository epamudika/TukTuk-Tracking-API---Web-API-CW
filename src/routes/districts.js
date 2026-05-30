const express = require('express');
const router = express.Router();

const districts = [
  { code: 'COL', name: 'Colombo', provinceCode: 'WP' },
  { code: 'GMP', name: 'Gampaha', provinceCode: 'WP' },
  { code: 'KAL', name: 'Kalutara', provinceCode: 'WP' },
  { code: 'KND', name: 'Kandy', provinceCode: 'CP' },
  { code: 'MTL', name: 'Matale', provinceCode: 'CP' },
  { code: 'NWE', name: 'Nuwara Eliya', provinceCode: 'CP' },
  { code: 'GAL', name: 'Galle', provinceCode: 'SP' },
  { code: 'MTR', name: 'Matara', provinceCode: 'SP' },
  { code: 'HAM', name: 'Hambantota', provinceCode: 'SP' },
  { code: 'JAF', name: 'Jaffna', provinceCode: 'NP' },
  { code: 'KIL', name: 'Kilinochchi', provinceCode: 'NP' },
  { code: 'MNR', name: 'Mannar', provinceCode: 'NP' },
  { code: 'VAV', name: 'Vavuniya', provinceCode: 'NP' },
  { code: 'MUL', name: 'Mullaitivu', provinceCode: 'NP' },
  { code: 'BAT', name: 'Batticaloa', provinceCode: 'EP' },
  { code: 'AMP', name: 'Ampara', provinceCode: 'EP' },
  { code: 'TRI', name: 'Trincomalee', provinceCode: 'EP' },
  { code: 'KUR', name: 'Kurunegala', provinceCode: 'NW' },
  { code: 'PUT', name: 'Puttalam', provinceCode: 'NW' },
  { code: 'ANU', name: 'Anuradhapura', provinceCode: 'NC' },
  { code: 'POL', name: 'Polonnaruwa', provinceCode: 'NC' },
  { code: 'BAD', name: 'Badulla', provinceCode: 'UP' },
  { code: 'MON', name: 'Monaragala', provinceCode: 'UP' },
  { code: 'RAT', name: 'Ratnapura', provinceCode: 'SG' },
  { code: 'KEG', name: 'Kegalle', provinceCode: 'SG' }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     District:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         provinceCode:
 *           type: string
 *       example:
 *         code: 'COL'
 *         name: 'Colombo'
 *         provinceCode: 'WP'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/District'
 *             example:
 *               - code: 'COL'
 *                 name: 'Colombo'
 *                 provinceCode: 'WP'
 *               - code: 'GMP'
 *                 name: 'Gampaha'
 *                 provinceCode: 'WP'
 *               - code: 'KAL'
 *                 name: 'Kalutara'
 *                 provinceCode: 'WP'
 *               - code: 'KND'
 *                 name: 'Kandy'
 *                 provinceCode: 'CP'
 *               - code: 'MTL'
 *                 name: 'Matale'
 *                 provinceCode: 'CP'
 *               - code: 'NWE'
 *                 name: 'Nuwara Eliya'
 *                 provinceCode: 'CP'
 *               - code: 'GAL'
 *                 name: 'Galle'
 *                 provinceCode: 'SP'
 *               - code: 'MTR'
 *                 name: 'Matara'
 *                 provinceCode: 'SP'
 *               - code: 'HAM'
 *                 name: 'Hambantota'
 *                 provinceCode: 'SP'
 *               - code: 'JAF'
 *                 name: 'Jaffna'
 *                 provinceCode: 'NP'
 *               - code: 'KIL'
 *                 name: 'Kilinochchi'
 *                 provinceCode: 'NP'
 *               - code: 'MNR'
 *                 name: 'Mannar'
 *                 provinceCode: 'NP'
 *               - code: 'VAV'
 *                 name: 'Vavuniya'
 *                 provinceCode: 'NP'
 *               - code: 'MUL'
 *                 name: 'Mullaitivu'
 *                 provinceCode: 'NP'
 *               - code: 'BAT'
 *                 name: 'Batticaloa'
 *                 provinceCode: 'EP'
 *               - code: 'AMP'
 *                 name: 'Ampara'
 *                 provinceCode: 'EP'
 *               - code: 'TRI'
 *                 name: 'Trincomalee'
 *                 provinceCode: 'EP'
 *               - code: 'KUR'
 *                 name: 'Kurunegala'
 *                 provinceCode: 'NW'
 *               - code: 'PUT'
 *                 name: 'Puttalam'
 *                 provinceCode: 'NW'
 *               - code: 'ANU'
 *                 name: 'Anuradhapura'
 *                 provinceCode: 'NC'
 *               - code: 'POL'
 *                 name: 'Polonnaruwa'
 *                 provinceCode: 'NC'
 *               - code: 'BAD'
 *                 name: 'Badulla'
 *                 provinceCode: 'UP'
 *               - code: 'MON'
 *                 name: 'Monaragala'
 *                 provinceCode: 'UP'
 *               - code: 'RAT'
 *                 name: 'Ratnapura'
 *                 provinceCode: 'SG'
 *               - code: 'KEG'
 *                 name: 'Kegalle'
 *                 provinceCode: 'SG'
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
    .get((req, res) => res.json(districts))
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
    .get((req, res) => {
        const district = districts.find(d => d.code === req.params.code);
        if (district) {
            res.json(district);
        } else {
            res.status(404).json({ message: "District not found" });
        }
    })
    .patch((req, res) => res.json({ message: "District updated" }))
    .delete((req, res) => res.json({ message: "District deleted" }));

module.exports = router;