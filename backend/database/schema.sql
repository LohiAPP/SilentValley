CREATE DATABASE event_db;

\c event_db;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
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

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
