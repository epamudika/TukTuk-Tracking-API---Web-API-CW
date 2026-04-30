const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, officer, device]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Username already exists
 */

router.post('/register', async (req, res) =>{
    try{
        const {username, password, role, province, district} = req.body;
        //Check if username already exists
        const existing = await User.findOne({username});
        if (existing){
            return res.status(400).json({
                message: 'Username already exists'
            });
        }
        // Hash password before saving
        const hashed = await bcrypt.hash(password,10);

        //Create new user
        const user = new User({
            username,
            password: hashed,
            role,
            province,
            district
        });
        await user.save();
        res.status(201).json({message: 'User created successfully'});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
} );

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Wrong password
 *       404:
 *         description: User not found
 */

//Logi user
router.post('/login', async(req, res) =>{
    try{
        const {username, password} = req.body;

        //Find user by username
        const user = await User.findOne({username});
        if (!user){
            return res.status(404).json({message: 'User not Found'});
        }
        
        //Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return res.status(400).json({message: 'Wrong password'});
        }

        //Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                province: user.province,
                district: user.district
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role
        });
        
    }catch (err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;

