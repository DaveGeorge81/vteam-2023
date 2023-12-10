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

    getAllUsers: function () {
        return db.prepare('SELECT id, name FROM users').all();
    },

    getUser: function (id) {
        return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    },

    addUser: function (body) {
        let result;

        try {
            result = db.prepare(`
                INSERT INTO users (name, balance, bank_account, recurring_withdraw)
                VALUES (?, ?, ?, ?)
            `).run(body.name, body.balance, body.bank_account, body.recurring_withdraw);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateUser: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE users SET (name, balance, bank_account, recurring_withdraw) =
                (?, ?, ?, ?) WHERE id = ?
            `).run(body.name, body.balance, body.bank_account, body.recurring_withdraw, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    withdrawUser: function (body) {
        let result;

        try {
            result = db.prepare('UPDATE users SET balance = balance - ? WHERE id = ?')
                .run(body.amount, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteUser: function (id) {
        return result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    },

};

module.exports = dbModel;
