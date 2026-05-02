const express = require('express');
const router = express.Router();
const TukTuk = require('../models/TukTuk');
const { protect, adminOnly, officerOrAdmin, deviceOnly } = require('../middleware/authMiddleware');


/**
 * @swagger
 * components:
 *   schemas:
 *     TukTuk:
 *       type: object
 *       required:
 *         - registrationNumber
 *         - driverName
 *         - driverNIC
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the TukTuk
 *         registrationNumber:
 *           type: string
 *           description: The vehicle registration number (e.g., WP-TUK-1234)
 *         driverName:
 *           type: string
 *         driverNIC:
 *           type: string
 *         phone:
 *           type: string
 *         province:
 *           type: string
 *         district:
 *           type: string
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/tuktuks:
 *   get:
 *     summary: Retrieve all registered TukTuks with filtering and sorting
 *     tags: [Tuktuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: province
 *         schema: { type: string }
 *       - in: query
 *         name: district
 *         schema: { type: string }
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [newest, oldest] }
 *     responses:
 *       200:
 *         description: A list of TukTuks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count: { type: integer }
 *                 data: { type: array, items: { $ref: '#/components/schemas/TukTuk' } }
 */
router.get('/', protect, officerOrAdmin, async (req, res) => {
    try {
        const { province, district, isActive, sort } = req.query;
        let filter = {};

        // Apply filters
        if (province) filter.province = province;
        if (district) filter.district = district;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        // Initialize query
        let query = TukTuk.find(filter);

        // Apply sorting
        if (sort === 'newest') query = query.sort({ createdAt: -1 });
        else if (sort === 'oldest') query = query.sort({ createdAt: 1 });

        const tuktuks = await query;
        res.status(200).json({
            count: tuktuks.length,
            data: tuktuks
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/tuktuks/search/{regNumber}:
 *   get:
 *     summary: Search for a TukTuk by registration number
 *     tags: [Tuktuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regNumber
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: TukTuk found
 *       404:
 *         description: TukTuk not found
 */
router.get('/search/:regNumber', protect, officerOrAdmin, async (req, res) => {
    try {
        const tuktuk = await TukTuk.findOne({
            registrationNumber: req.params.regNumber
        });
        if (!tuktuk) {
            return res.status(404).json({ message: 'TukTuk not found' });
        }
        res.status(200).json(tuktuk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/tuktuks/{id}:
 *   put:
 *     summary: Update TukTuk details (Admin Only)
 *     tags: [Tuktuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TukTuk'
 *     responses:
 *       200:
 *         description: Updated successfully
 * 
 *   delete:
 *     summary: Remove a TukTuk from the system (Admin Only)
 *     tags: [Tuktuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted successfully
 */


router.get('/:id', protect, officerOrAdmin, async (req, res) => {
    try {
        const tuktuk = await TukTuk.findById(req.params.id);
        if (!tuktuk) {
            return res.status(404).json({ message: 'TukTuk not found' });
        }
        res.status(200).json(tuktuk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update tuktuk (Admin Only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const tuktuk = await TukTuk.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!tuktuk) {
            return res.status(404).json({ message: 'TukTuk not found' });
        }
        res.status(200).json({
            message: 'TukTuk updated successfully',
            data: tuktuk
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE tuktuk (Admin Only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const tuktuk = await TukTuk.findByIdAndDelete(req.params.id);
        if (!tuktuk) {
            return res.status(404).json({ message: 'TukTuk not found' });
        }
        res.status(200).json({ message: 'TukTuk deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/ping', protect, deviceOnly, async (req, res) => {
    try {
        const { tukTukId, latitude, longitude } = req.body;
        
        const newLog = await LocationLog.create({
            tukTukId,
            latitude,
            longitude,
            timestamp: new Date()
        });

        res.status(201).json({
            message: 'Location updated successfully',
            data: newLog
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;