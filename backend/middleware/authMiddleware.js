const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    
    // Ensure JWT_SECRET is present
    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      return res.status(500).json({ error: 'Internal server configuration error.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) res.sendStatus(403);
      else { req.authData = authData; next(); }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
