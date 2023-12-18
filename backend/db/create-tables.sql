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
    station_id INTEGER DEFAULT 0 NOT NULL,
    park_id INTEGER DEFAULT 0 NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    speed REAL DEFAULT 0 NOT NULL,
    battery REAL NOT NULL
);

DROP TABLE IF EXISTS stations;

CREATE TABLE stations
(
    id INTEGER PRIMARY KEY,
    city_id INTEGER NOT NULL,
    num_free INTEGER CHECK (num_free>=0) NOT NULL,
    num_total INTEGER NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL
);

DROP TABLE IF EXISTS park_zones;

CREATE TABLE park_zones
(
    id INTEGER PRIMARY KEY,
    city_id INTEGER NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    dlat REAL NOT NULL,
    dlon REAL NOT NULL
);


