const jwt = require('jsonwebtoken');

// Check if user gas valid token
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message: 'No token provided, access denied'
        });
    }
    
    const token = authHeader.split('')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (err){
        res.status(401).json({message: 'Invalid token'});
    }
};

//Admin only access
const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin'){
        return res.status(403).json({
            message: 'Access denied - Admin only'
        });
    }
    next();
};
// Officers and admin access
const officerOrAdmin = (req, res, next) => {
    if (req.user.role == 'device'){
        return res.status(403).jason({
            message: 'Access denied - Offcers and Admins only'
        });
    }
    next();
};
module.exports = {protect, adminOnly, officerOrAdmin };