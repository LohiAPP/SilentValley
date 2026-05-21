const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  try {
    const eventsResult = await pool.query('SELECT COUNT(*) FROM events');
    const galleryResult = await pool.query('SELECT COUNT(*) FROM gallery');
    const registrationsResult = await pool.query('SELECT COUNT(*) FROM event_registrations');
    res.json({
      events: parseInt(eventsResult.rows[0].count),
      gallery: parseInt(galleryResult.rows[0].count),
      registrations: parseInt(registrationsResult.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
