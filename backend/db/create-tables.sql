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


