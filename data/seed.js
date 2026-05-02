require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Correct paths for root folder
const TukTuk = require('../models/TukTuk');
const LocationLog = require('../models/LocationLog');
const User = require('../models/User');

const districts = [
    { name: 'Colombo', province: 'Western' },
    { name: 'Gampaha', province: 'Western' },
    { name: 'Kaluthara', province: 'Western' },
    { name: 'Kandy', province: 'Central' },
    { name: 'Matale', province: 'Central' },
    { name: 'Nuwara Eliya', province: 'Central' },
    { name: 'Galle', province: 'Southern' },
    { name: 'Matara', province: 'Southern' },
    { name: 'Hambantota', province: 'Southern' },
    { name: 'Jaffna', province: 'Northern' },
    { name: 'Kilinochchi', province: 'Northern' },
    { name: 'Mannar', province: 'Northern' },
    { name: 'Vavuniya', province: 'Northern' },
    { name: 'Mullativ', province: 'Northern' },
    { name: 'Batticaloa', province: 'Eastern' },
    { name: 'Ampara', province: 'Eastern' },
    { name: 'Trincomalee', province: 'Eastern' },
    { name: 'Kurunegala', province: 'North Western' },
    { name: 'Puttalam', province: 'North Western' },
    { name: 'Anuradhapura', province: 'North Central' },
    { name: 'Polonnaruwa', province: 'North Central' },
    { name: 'Badulla', province: 'Uva' },
    { name: 'Monaragala', province: 'Uva' },
    { name: 'Ratnapura', province: 'Sabaragamuwa' },
    { name: 'Kegalle', province: 'Sabaragamuwa' },
];

const policeStations = [
    'Colombo Fort', 'Wellampitiya', 'Dehiwala', 'Nugegoda', 'Kaduwela',
    'Negombo', 'Gampaha', 'Ja-Ela', 'Kalutara', 'Peradeniya',
    'Matale', 'Nuwara Eliya', 'Hatton', 'Galle', 'Matara', 'Hambantota',
    'Jaffna', 'Vavuniya', 'Batticaloa'
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected - Seeding data....');

        await TukTuk.deleteMany({});
        await LocationLog.deleteMany({});
        await User.deleteMany({});
        console.log('Old data cleaned');

        const adminPass = await bcrypt.hash('Admin@1234', 10);
        await User.create({ username: 'admin', password: adminPass, role: 'admin' });

        const officerPass = await bcrypt.hash('Officer@1234', 10);
        await User.create({
            username: 'officer_western',
            password: officerPass,
            role: 'officer',
            district: 'Colombo'
        });

        console.log('Users created');

        for (let i = 1; i <= 200; i++) {
            const dist = districts[i % districts.length];
            
            const tuktuk = await TukTuk.create({
                registrationNumber: `WP-TUK-${1000 + i}`, // Fixed backticks
                driverName: `Driver ${i}`, // Fixed backticks
                driverNIC: `1995${100000 + i}V`,
                phone: `07${10000000 + i}`, // Fixed backticks
                province: dist.province,
                district: dist.name,
                isActive: true
            });

            // Create logs for this TukTuk (5 logs per day for 7 days = 35 logs per TukTuk)
            let logs = [];
            for (let day = 0; day < 7; day++) { // Changed 'dat' to 'day'
                for (let hour = 0; hour < 5; hour++) {
                    logs.push({
                        tukTukId: tuktuk._id,
                        latitude: 6.9 + Math.random() * 0.5,
                        longitude: 79.8 + Math.random() * 0.5,
                        province: tuktuk.province,
                        district: tuktuk.district,
                        speed: Math.floor(Math.random() * 60),
                        timestamp: new Date(Date.now() - (day * 86400000) - (hour * 3600000))
                    });
                }
            }
            await LocationLog.insertMany(logs);

            if (i % 50 === 0) console.log(`Seeded ${i} TukTuks...`); // Fixed backticks
        }

        console.log('Seeding complete! Total Logs created: 7000');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });