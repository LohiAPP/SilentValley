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

router.post('/', verifyToken, parser.array('images', 10), async (req, res) => {
  try {
    const { category, title } = req.body;
    
    if (!req.files || req.files.length === 0) {
      if (!req.body.image_url) {
        return res.status(400).json({ error: 'At least one image is required' });
      }
      
      const result = await pool.query(
        'INSERT INTO gallery (image_url, category, title) VALUES ($1, $2, $3) RETURNING *',
        [req.body.image_url, category || 'Uncategorized', title || '']
      );
      return res.status(201).json([result.rows[0]]);
    }

    const insertedImages = [];
    
    for (const file of req.files) {
      const imageUrl = file.path.startsWith('http') ? file.path : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      const result = await pool.query(
        'INSERT INTO gallery (image_url, category, title) VALUES ($1, $2, $3) RETURNING *',
        [imageUrl, category || 'Uncategorized', title || '']
      );
      insertedImages.push(result.rows[0]);
    }
    
    res.status(201).json(insertedImages);
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
