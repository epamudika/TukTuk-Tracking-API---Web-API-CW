/**const express = require('express');
const router = express.Router();
const LocationLog = require('../models/LocationLog');
const TukTuk = require('../models/TukTuk');
const {protect, officerOrAdmin} = require('../middleware/authMiddleware');

//POST - tuktuk sends GPS ping
router.post('/ping', protect, async(req, res) => {
    try{
        const{
            tukTukId,
            latitude,
            longitude,
            province,
            district
        } = req.body;

        //Save location ping
        const log = new LocationLog({
            tukTukId,
            latitude,
            longitude,
            province,
            district
        });
        await log.save();
        res.status(201).json({
            message: 'Location saved successfully',
            data: log
        });
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

//GET live location of all tuktuks
router.get('/live', protect, officerOrAdmin, async (req, res) => {
    try{
        const {province, district} = req.query;
        let filter = {};

        //Apply filters
        if (province) filter.province = province;
        if (district) filter.district = district;

        const tuktuks = await TukTuk.find(filter);
        const liveLocations = [];

        // Get latest location for each tuktuk
        for (const tuktuk of tuktuks) {
        const latest = await LocationLog.findOne({
            tukTukId: tuktuk._id
        }).sort({ timestamp: -1 });
        
        if (latest) {
            liveLocations.push({
                tuktuk: tuktuk.registrationNumber,
                driver: tuktuk.driverName,
                province:tuktuk.province,
                district: tuktuk.district,
                latitude: latest.latitude,
                longitude: latest.longitude,
                speed: latest.speed,
                lastSeen: latest.timestamp
            });
        }
    }

    res.status(200).json({
        count: liveLocations.length,
        data: liveLocations
    });

    }   
    catch (err) {
    res.status(500).json({ message: err.message });
    }
});
*/
