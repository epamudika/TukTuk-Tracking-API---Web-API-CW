require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Correct paths for root folder
const TukTuk = require('./models/TukTuk');
const LocationLog = require('./models/LocationLog');
const User = require('./models/User');

const districts = [
    {name: 'Colombo', province: 'Western'},
    {name: 'Gampaha', province: 'Western'},
    {name: 'Kaluthara', province: 'Western'},
    {name: 'Kandy', province: 'Central'},
    {name: 'Matale', province: 'Central'},
    {name: 'Nuwara Eliya', province: 'Central'},
    {name: 'Galle', province: 'Southern'},
    {name: 'Matara', province: 'Southern'},
    {name: 'Hambantota', province: 'Southern'},
    {name: 'Jaffna', province: 'Nothern'},
    {name: 'Kilinochchi', province: 'Nothern'},
    {name: 'Mannar', province: 'Nothern'},
    {name: 'Vavuniya', province: 'Nothern'},
    {name: 'Mullativ', province: 'Nothern'},
    {name: 'Batticloa', province: 'Eastern'},
    {name: 'Ampara', province: 'Eastern'},
    {name: 'Trincomalee', province: 'Eastern'},
    {name: 'Kurunegala', province: 'Western'},
    {name: 'Puttalam', province: 'Western'},
    {name: 'Anuradhapura', province: 'Western'},
    {name: 'Polonnaruwa', province: 'Western'},
    {name: 'Badulla', province: 'Western'},
    {name: 'Monaragala', province: 'Western'},
    {name: 'Ratnapura', province: 'Western'},
    {name: 'Kegalle', province: 'Western'},

];

const policeStations = [
    'Colombo Fort', 'Wellampitiya', 'Dehiwala', 'Nugegoda', 'Kaduwela',
    'Negombo', 'Gampaha', 'Ja-Ela', 'Kalutara', 'Peradeniya',
    'Matale', 'Nuwara Eliya', 'Hatton', 'Galle', 'Matara', 'Hambantota',
    'Jaffna', 'Vavuniya', 'Batticloa'
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected - Seeding data....');

        await TukTuk.deleteMany({});
        await LocationLog.deleteMany({});
        await User.deleteMany({});
        console.log('Old data cleaned');

        const adminPass = await bcrypt.hash('Admin@1234', 10);
        await User.create({username: 'admin', password: adminPass, role: 'admin'});

        const officerPass = await bcrypt.hash('Officer@1234', 10);
        await User.create({
            username: 'officer_western',
            password: officerPass,
            role: 'officer',
            district: 'Colombo'
        });

        console.log('Users created');

        for (let i = 1; i <= 200; i++){
            const dist = districts[i % districts.length];
            const station = policeStations[i % policeStations.length];

            const tuktuk = await TukTuk.create({
                registrationNumber: 'WP-TUK-${1000+i}',
                driverName: 'Driver ${i}',
                phone: '07${10000000 +i}',
                province: dist.province,
                district: dist.name,
                isActive: true
            });

            // Create logs in bulk for this TukTuk (faster)
            let logs = [];
            for (let dat = 0; day<7; day++){
                for (let hour = 0; hour<5; hour++){
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

            if (i % 50 == 0) console.log('Seeded ${} TukTuks..');
            
        }
        console.log('✅ Seeding complete! Total Logs: 7000');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
