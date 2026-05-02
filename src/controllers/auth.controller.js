const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const {username, password, role, province, district} = req.body;
        const existing = await User.findOne({username});
        if (existing) return res.status(400).json({message: 'Username already exists'});

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashed, role, province, district});
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.status(404).json({message: 'User not found'});

        const match = await bcrypt.compare(password, user, password);
        if (!match) return res.status(400).json({message: 'Wrong password'});

        const token = jwt.sign(
            {id: user._id, role: user.role, province: user.province, district: user.district},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({message: 'Login successful', token, role: user.role});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
};