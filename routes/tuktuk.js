const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Tuktuk route working' });
});

module.exports = router;