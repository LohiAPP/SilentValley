const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');
const { parser } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    const result = await pool.query(
      'SELECT * FROM events ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', verifyToken, parser.single('image'), async (req, res) => {
  try {
    const { title, theme, date, time, description, zoom_id, passcode, speaker, join_link, highlights } = req.body;
    const imageUrl = req.file ? (req.file.path.startsWith('http') ? req.file.path : `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`) : null;

    const result = await pool.query(
      `INSERT INTO events (title, theme, date, time, description, zoom_id, passcode, speaker, join_link, highlights, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, theme, date, time, description, zoom_id, passcode, speaker, join_link, highlights ? JSON.stringify(highlights) : null, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', verifyToken, parser.single('image'), async (req, res) => {
  try {
    const { title, theme, date, time, description, zoom_id, passcode, speaker, join_link, highlights } = req.body;
    
    // Build update query dynamically
    let query = 'UPDATE events SET title=$1, theme=$2, date=$3, time=$4, description=$5, zoom_id=$6, passcode=$7, speaker=$8, join_link=$9, highlights=$10';
    let values = [title, theme, date, time, description, zoom_id, passcode, speaker, join_link, highlights ? JSON.stringify(highlights) : null];
    let paramIndex = 11;
    
    // If a new image is uploaded, update image_url
    if (req.file) {
      const imageUrl = req.file.path.startsWith('http') ? req.file.path : `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      query += `, image_url=$${paramIndex}`;
      values.push(imageUrl);
      paramIndex++;
    }
    
    query += ` WHERE id=$${paramIndex} RETURNING *`;
    values.push(req.params.id);

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
