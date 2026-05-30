const express = require('express');
const router = express.Router();
const PoliceStation = require('../models/PoliceStations'); 

router.route('/')
    .get(async (req, res) => {
        try {
            const stations = await PoliceStation.find();
            res.status(200).json(stations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const { name, districtCode } = req.body;
            
            if (!name || !districtCode) {
                return res.status(400).json({ error: "Name and districtCode are required." });
            }

            const newStation = new PoliceStation({ name, districtCode });
            const savedStation = await newStation.save();
            
            res.status(201).json(savedStation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

module.exports = router;