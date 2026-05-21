const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, e.title as event_title, e.date as event_date
      FROM event_registrations r
      LEFT JOIN events e ON r.event_id = e.id
      ORDER BY r.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { event_id, name, email, phone, city } = req.body;
    if (!event_id || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO event_registrations (event_id, name, email, phone, city) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [event_id, name, email, phone, city || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM event_registrations WHERE id = $1', [req.params.id]);
    res.json({ message: 'Registration deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
