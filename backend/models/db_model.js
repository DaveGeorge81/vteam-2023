/**
 * Database model using SQLite.
 * © Vteam 2023 Group 8.
 */
const db = require('better-sqlite3')('./db/bike-rentals.sqlite');

const dbModel = {
    closeDB: function () {
        db.close();
    },

    /**
     * Cities
     */
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

    /**
     * Users
     */
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

    /**
     * Bikes
     */
    getBikesCity: function (city_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ?').all(city_id);
    },

    getBikesCityStatus: function (city_id, status_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ? AND status_id = ?')
            .all(city_id, status_id);
    },

    getBikesCityStation: function (city_id, station_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ? AND station_id = ?')
            .all(city_id, station_id);
    },

    getBikesCityParkZone: function (city_id, park_id) {
        return db.prepare('SELECT * FROM bikes WHERE city_id = ? AND park_id = ?')
            .all(city_id, park_id);
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
            INSERT INTO bikes (city_id, user_id, status_id, station_id, park_id, lat, lon,
                speed, battery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(body.city_id, body.user_id, body.status_id, body.station_id, body.park_id,
            body.lat, body.lon, body.speed, body.battery);

        return result;
    },

    updateBike: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE bikes SET (city_id, user_id, status_id, station_id, park_id, lat, lon,
                    speed, battery) = (?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ?
            `).run(body.city_id, body.user_id, body.status_id, body.station_id, body.park_id,
                body.lat, body.lon, body.speed, body.battery, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateBikeCheckParkZone: function (body) {
        let result;

        try {
            const bike = db.prepare('SELECT * FROM bikes WHERE id = ?').get(body.id);

            if (!bike) {
                 throw new Error('id not found');
            }

            const park_zones = db.prepare(`SELECT * FROM park_zones WHERE city_id =
                ${bike.city_id}`);
            let park_id = 0;

            for (const zone of park_zones.iterate()) {
                if (bike.lat >= zone.lat - zone.dlat && bike.lat <= zone.lat + zone.dlat &&
                    bike.lon >= zone.lon - zone.dlon && bike.lon <= zone.lon + zone.dlon) {
                    park_id = zone.id;
                    break;
                }
            }

            result = db.prepare(`UPDATE bikes SET park_id = ${park_id} WHERE id = ?`)
                .run(body.id);

            result.park_id = park_id;
        } catch (err) {
            result = {
                changes: 0,
                park_id: 0,
                message: err.message
            }
        }

        return result;
    },

    updateBikeUserStatusStationPark: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE bikes SET (user_id, status_id, station_id, park_id) =
                (?, ?, ?, ?) WHERE id = ?
            `).run(body.user_id, body.status_id, body.station_id, body.park_id, body.id);
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

    /**
     * Charging stations
     */
    getStationsCity: function (city_id) {
        return db.prepare('SELECT * FROM stations WHERE city_id = ?').all(city_id);
    },

    getStation: function (id) {
        return db.prepare('SELECT * FROM stations WHERE id = ?').get(id);
    },

    addStation: function (body) {
        let result;

        result = db.prepare(`
            INSERT INTO stations (city_id, num_free, num_total, lat, lon)
            VALUES (?, ?, ?, ?, ?)
        `).run(body.city_id, body.num_free, body.num_total, body.lat, body.lon);

        return result;
    },

    updateStation: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE stations SET (city_id, num_free, num_total, lat, lon) =
                (?, ?, ?, ?, ?) WHERE id = ?
            `).run(body.city_id, body.num_free, body.num_total, body.lat, body.lon, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    addNumFreeStation: function (body) {
        let result;

        try {
            result = db.prepare(`UPDATE stations SET num_free = num_free + ? WHERE id = ?`)
                .run(body.num, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteStation: function (id) {
        return result = db.prepare('DELETE FROM park_zones WHERE id = ?').run(id);
    },

    /**
     * Parking zones
     */
    getParkZonesCity: function (city_id) {
        return db.prepare('SELECT * FROM park_zones WHERE city_id = ?').all(city_id);
    },

    getParkZone: function (id) {
        return db.prepare('SELECT * FROM park_zones WHERE id = ?').get(id);
    },

    addParkZone: function (body) {
        let result;

        result = db.prepare(`
            INSERT INTO park_zones (city_id, lat, lon, dlat, dlon)
            VALUES (?, ?, ?, ?, ?)
        `).run(body.city_id, body.lat, body.lon, body.dlat, body.dlon);

        return result;
    },

    updateParkZone: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE park_zones SET (city_id, lat, lon, dlat, dlon) =
                (?, ?, ?, ?, ?) WHERE id = ?
            `).run(body.city_id, body.lat, body.lon, body.dlat, body.dlon, body.id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteParkZone: function (id) {
        return result = db.prepare('DELETE FROM park_zones WHERE id = ?').run(id);
    },



};

module.exports = dbModel;










