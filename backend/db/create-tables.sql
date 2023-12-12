--
-- Schema for database bike-rentals.sqlite
--

PRAGMA journal_mode=WAL;

DROP TABLE IF EXISTS cities;

CREATE TABLE cities
(
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    dlat REAL NOT NULL,
    dlon REAL NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    balance REAL DEFAULT 0 NOT NULL,
    bank_account TEXT DEFAULT '',
    recurring_withdraw REAL DEFAULT 0
);

DROP TABLE IF EXISTS bikes;

CREATE TABLE bikes
(
    id INTEGER PRIMARY KEY,
    city_id INTEGER NOT NULL,
    user_id INTEGER DEFAULT 0 NOT NULL,
    status_id INTEGER DEFAULT 0 NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    speed REAL DEFAULT 0 NOT NULL,
    battery REAL NOT NULL
);


