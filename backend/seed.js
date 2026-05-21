require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'event_db',
  password: process.env.DB_PASSWORD || 'your_password_here',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function seed() {
  try {
    console.log('Creating tables if they do not exist...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        image_url TEXT,
        title TEXT,
        theme TEXT,
        date TEXT,
        time TEXT,
        description TEXT,
        zoom_id TEXT,
        passcode TEXT,
        speaker TEXT,
        join_link TEXT,
        highlights JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        youtube_url TEXT NOT NULL,
        title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS event_registrations (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        cover_image_url TEXT,
        book_file_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Creating initial admin user...');
    const email = process.env.INITIAL_ADMIN_EMAIL || 'admin@thesilentvalley.org';
    const password = process.env.INITIAL_ADMIN_PASSWORD || 'thesilentvalley.org';
    
    if (password === 'thesilentvalley.org') {
      console.warn('\n⚠️ WARNING: You are using the default weak password. Please set INITIAL_ADMIN_PASSWORD in your .env file before deploying to production!\n');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Check if user exists
    const checkUser = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (checkUser.rows.length === 0) {
      await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2)', [email, hashedPassword]);
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
    
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    pool.end();
  }
}

seed();
