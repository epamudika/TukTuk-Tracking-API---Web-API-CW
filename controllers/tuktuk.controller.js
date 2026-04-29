const TukTuk = require('../models'/TukTuk);

//GET all tuktuks
exports.getAllTuktuks = async (req, res) => {
    try{
        const{province, district, isActive, sort} = req.query;
        let filter = {};

        if (province) filter.province = province;
        if (district) filter.district = district;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        let query = TukTuk.find(filter);
        if (sort === 'newest') query = query.sort({createdAt: -1});
        if (sort === 'oldest') query = query.sort({createdAt: 1});

        const tuktuks = await query;
        res.status(200).json({count: tuktuks.length, data: tuktuks});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }

};

// GET tuktukId
exports.getTuktukId = async (req, res) => {
    try{
        const tuktuk = await TukTuk.findById(req.params.id);
        if (!tuktuk) return res.status(404).json({message: 'TukTuk not found'});
        res.status(200).json(tuktuk);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Search By registration Number
exports.searchByRegNumber = async (req, res) => {
    try{
        const tuktuk = await TukTuk.findOne({registrationNumber: req.params.regNumber});
        if (!tuktuk) return res.status(404).json({message: 'TukTuk not found'});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
};

// Update TukTuk
exports.updateTuktuk = async (req, res) => {
    try {
        const tuktuk = await TukTuk.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tuktuk) return res.status(404).json({ message: 'TukTuk not found' });
        res.status(200).json({ message: 'TukTuk updated successfully', data: tuktuk });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete TukTuk
exports.deleteTuktuk = async (req, res) => {
    try {
        const tuktuk = await TukTuk.findByIdAndDelete(req.params.id);
        if (!tuktuk) return res.status(404).json({ message: 'TukTuk not found' });
        res.status(200).json({ message: 'TukTuk deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};