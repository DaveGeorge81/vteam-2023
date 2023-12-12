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

    getBikesCity: function (city_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ?').all(city_id);
    },

    getBikesCityStatus: function (city_id, status_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ? AND status_id = ?')
            .all(city_id, status_id);
    },

    getBike: function (id) {
        return db.prepare('SELECT * FROM bikes WHERE id = ?').get(id);
    },

    getBikeUser: function (user_id) {
        return db.prepare('SELECT * FROM bikes WHERE user_id = ?').get(user_id);
    },

    addBike: function (body) {
        let result;

        result = db.prepare(`
            INSERT INTO bikes (city_id, user_id, status_id, lat, lon, speed, battery)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(body.city_id, body.user_id, body.status_id, body.lat, body.lon,
            body.speed, body.battery);

        return result;
    },

    updateBike: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE bikes SET (city_id, user_id, status_id, lat, lon, speed, battery) =
                (?, ?, ?, ?, ?, ?, ?) WHERE id = ?
            `).run(body.city_id, body.user_id, body.status_id, body.lat, body.lon,
                body.speed, body.battery, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateBikeUserStatus: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE bikes SET (user_id, status_id) =
                (?, ?) WHERE id = ?
            `).run(body.user_id, body.status_id, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateBikePosSpeedBatt: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE bikes SET (lat, lon, speed, battery) =
                (?, ?, ?, ?) WHERE id = ?
            `).run(body.lat, body.lon, body.speed, body.battery, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteBike: function (id) {
        return result = db.prepare('DELETE FROM bikes WHERE id = ?').run(id);
    },

};

module.exports = dbModel;










