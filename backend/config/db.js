const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'event_db',
  password: process.env.DB_PASSWORD || 'your_password_here',
  port: parseInt(process.env.DB_PORT || '5432'),
});

module.exports = pool;
