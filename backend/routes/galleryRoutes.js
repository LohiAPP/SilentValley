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
      'SELECT * FROM gallery ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', verifyToken, parser.single('image'), async (req, res) => {
  try {
    const { category, title } = req.body;
    const imageUrl = req.file ? (req.file.path.startsWith('http') ? req.file.path : `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`) : req.body.image_url;
    
    if (!imageUrl) return res.status(400).json({ error: 'Image is required' });

    const result = await pool.query(
      'INSERT INTO gallery (image_url, category, title) VALUES ($1, $2, $3) RETURNING *',
      [imageUrl, category || 'Uncategorized', title || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery WHERE id = $1', [req.params.id]);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
