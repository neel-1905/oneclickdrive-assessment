import Database from "better-sqlite3";

export const db = new Database(`db/database.sqlite`);

// USERS
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// LISTINGS
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_day INTEGER,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
   CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`);
