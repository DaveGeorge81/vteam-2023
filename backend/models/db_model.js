/**
 * Database model using SQLite.
 * © Vteam 2023 Group 8.
 */
const db = require('better-sqlite3')('./db/bike-rentals.sqlite');

const dbModel = {
    closeDB: function () {
        db.close();
    },

    getAllCities: function () {
        return db.prepare('SELECT * FROM cities').all();
    },

    getCity: function (id) {
        return db.prepare('SELECT * FROM cities WHERE id = ?').get(id);
    },

    addCity: function (body) {
        let result;

        try {
            result = db.prepare(`
                INSERT INTO cities (name, lat, lon, dlat, dlon)
                VALUES (?, ?, ?, ?, ?)
            `).run(body.name, body.lat, body.lon, body.dlat, body.dlon);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateCity: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE cities SET (name, lat, lon, dlat, dlon) = (?, ?, ?, ?, ?)
                WHERE id = ?
            `).run(body.name, body.lat, body.lon, body.dlat, body.dlon, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteCity: function (id) {
        return result = db.prepare('DELETE FROM cities WHERE id = ?').run(id);
    },

};

module.exports = dbModel;
