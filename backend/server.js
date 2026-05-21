const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const videosRoutes = require('./routes/videosRoutes');
const booksRoutes = require('./routes/booksRoutes');
const registrationsRoutes = require('./routes/registrationsRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Validate essential environment variables
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not set in the environment variables. The server will not start safely.');
  process.exit(1);
}

// ---- SECURITY MIDDLEWARES ----
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // To allow image loading

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to API calls only
app.use('/api', limiter);

// ---- STANDARD MIDDLEWARES ----
app.use(express.json());

// Serve local uploads if not using cloudinary (fallback mechanism)
app.use('/uploads', express.static('uploads'));

// ---- ROUTES ----
app.use('/api/login', authRoutes); // Note: /api/login was directly in server.js without /api/auth prefix previously
app.use('/api/stats', statsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/registrations', registrationsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
