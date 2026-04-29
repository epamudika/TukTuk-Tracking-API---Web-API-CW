const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const {protect, adminOnly} = require('../middleware/authMiddleware');

router.get('/dashboard', protect, adminOnly, adminController.getDashboardSummary);
router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.get('/stats/province', protect, adminOnly, adminController.getStatsByProvince);
router.delete('/users/:id', protect, adminOnly, adminController.deleteUser);

module.exports = router;
