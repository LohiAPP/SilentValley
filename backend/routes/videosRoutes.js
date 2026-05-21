const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { youtube_url, title } = req.body;
    if (!youtube_url) return res.status(400).json({ error: 'YouTube URL is required' });

    const result = await pool.query(
      'INSERT INTO videos (youtube_url, title) VALUES ($1, $2) RETURNING *',
      [youtube_url, title || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM videos WHERE id = $1', [req.params.id]);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
