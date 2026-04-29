const express = require('express');
const router = express.Router();
const TukTuk = require('../models/TukTuk');
const {protect, adminOnly, officerOrAdmin} = require('../middleware/authMiddleware');

// GET all tuk-tuk with filtering and sorting
router.get('/', protect, officerOrAdmin, async (req, res) => {
    try{
        const{province, district, isActive, sort} = req.query;
        let filter = {};

        //Apply filters
        if (province) filter.province = province;
        if (district) filter.district = district;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        //Apply sorting
        let query = TukTuk.find(filter);
        if (sort === 'newest') query = query.sort({createdAt: -1});
        if (sort === 'oldest') query = query.sort({createdAt: 1});

        const tuktuks = await query;
        res.status(200).json({
            count: tuktuks.length,
            data: tuktuks
        });
    } 
    catch (err){
        res.status(500).json({message: err.message});
    } 
});

// GET one tuktuk by ID
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

//GET search by registration number
router.get('/search/:regNumber', protect, officerOrAdmin,
    async(req, res) => {
        try{
            const tuktuk = await TukTuk.findOne({
                registrationNumber: req.params.regNumber
            });
        if (!tuktuk){
            return res.status(404).json({message: 'TukTuk not found'});
        }
        res.status(200).json(tuktuk);
        }
        catch (err){
            res.status(500).json({message: err.message});
        }
    }
);

//PUT update tuktuk
router.put('/:id', protect, adminOnly, async (req, res) => {
    try{
        const tuktuk = await TukTuk.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if (!tuktuk){
            return res.status(404).json({message: 'TukTuk not found'});
            
        }
        res.status(200).json({
            message: 'TukTuk updated successfully',
            data: tuktuk
        });
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

//DELETE tuktuk
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try{
        const tuktuk = await TukTuk.findByIdAndDelete(req.params.id);
        if (!tuktuk){
            return res.status(404).json({message: 'TukTuk not found'});
        }
        res.status(200).json({message: 'TukTuk deleted successfully'});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;