const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');
const { parser } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', verifyToken, parser.fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    let coverImageUrl = '';
    let bookFileUrl = '';

    if (req.files) {
      if (req.files.cover && req.files.cover[0]) {
        const file = req.files.cover[0];
        coverImageUrl = file.path.startsWith('http') ? file.path : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      }
      if (req.files.file && req.files.file[0]) {
        const file = req.files.file[0];
        bookFileUrl = file.path.startsWith('http') ? file.path : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      }
    }

    if (!title || !bookFileUrl) return res.status(400).json({ error: 'Title and Book File are required' });

    const result = await pool.query(
      'INSERT INTO books (title, description, cover_image_url, book_file_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description || '', coverImageUrl, bookFileUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [req.params.id]);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
