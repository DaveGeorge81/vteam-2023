/**
 * Database model using SQLite.
 * © Vteam 2023 Group 8.
 */
const db = require('better-sqlite3')('./db/bike-rentals.sqlite');

/**
 * Check if a position (lat, lon) is in a parking zone.
 * Return the park_id (0 if not in a zone).
 */
function posInParkingZone(city_id, lat, lon) {
    const park_zones = db.prepare(`SELECT * FROM park_zones WHERE city_id = ?`);
    let park_id = 0;

    for (const zone of park_zones.iterate(city_id)) {
        if (lat >= zone.lat - zone.dlat && lat <= zone.lat + zone.dlat &&
            lon >= zone.lon - zone.dlon && lon <= zone.lon + zone.dlon) {
            park_id = zone.id;
            break;
        }
    }

    return park_id;
}

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
            const bike = db.prepare('SELECT city_id, lat, lon FROM bikes WHERE id = ?')
                .get(body.id);

            if (!bike) {
                throw new Error('id not found');
            }

            const park_id = posInParkingZone(bike.city_id, bike.lat, bike.lon);

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

    updateBikeStartCharge: function (body) {
        let result;

        try {
            const bike = db.prepare('SELECT status_id FROM bikes WHERE id = ?')
                .get(body.bike_id);

            if (!bike) {
                throw new Error('bike_id not found');
            }

            if (bike.status_id === 3) {
                throw new Error('Bike is already charging');
            }

            const stationResult = db.prepare(`UPDATE stations SET num_free = num_free - 1
                WHERE id = ?`).run(body.station_id);

            if (stationResult.changes === 0) {
                throw new Error('station_id not found');
            }

            result = db.prepare(`UPDATE bikes SET (status_id, station_id) = (3, ?) WHERE id = ?`)
                .run(body.station_id, body.bike_id);

        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updateBikeStopCharge: function (body) {
        let result;

        try {
            const bike = db.prepare('SELECT status_id, station_id FROM bikes WHERE id = ?')
                .get(body.bike_id);

            if (!bike) {
                throw new Error('bike_id not found');
            }

            if (bike.status_id !== 3) {
                throw new Error('Bike is not charging');
            }

            const stationResult = db.prepare(`UPDATE stations SET num_free = num_free + 1
                WHERE id = ?`).run(bike.station_id);

            if (stationResult.changes === 0) {
                throw new Error('station_id not found');
            }

            result = db.prepare(`UPDATE bikes SET (status_id, station_id) = (0, 0) WHERE id = ?`)
                .run(body.bike_id);

        } catch (err) {
            result = {
                changes: 0,
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
/*
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
*/
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

    /**
     * Pricing
     */
    getPricingCity: function (city_id) {
        return db.prepare('SELECT * FROM pricing WHERE city_id = ?').get(city_id);
    },

    addPricing: function (body) {
        let result;

        try {
            result = db.prepare(`
                INSERT INTO pricing (city_id, start_fee, minute_fee, extra_fee, discount)
                VALUES (?, ?, ?, ?, ?)
            `).run(body.city_id, body.start_fee, body.minute_fee, body.extra_fee, body.discount);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    updatePricing: function (body) {
        let result;

        try {
            result = db.prepare(`
                UPDATE pricing SET (start_fee, minute_fee, extra_fee, discount) =
                (?, ?, ?, ?) WHERE city_id = ?
            `).run(body.start_fee, body.minute_fee, body.extra_fee, body.discount, body.city_id);
        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    deletePricing: function (city_id) {
        return result = db.prepare('DELETE FROM pricing WHERE city_id = ?').run(city_id);
    },

    /**
     * Rides
     */
    getRidesUser: function (user_id) {
        return db.prepare('SELECT * FROM rides WHERE user_id = ?').all(user_id);
    },

    getRidesBike: function (bike_id) {
        return db.prepare('SELECT * FROM rides WHERE bike_id = ?').all(bike_id);
    },

    getRide: function (id) {
        return db.prepare('SELECT * FROM rides WHERE id = ?').get(id);
    },

    startRide: function (body) {
        let result;

        try {
            const bike = db.prepare('SELECT status_id, lat, lon FROM bikes WHERE id = ?')
                .get(body.bike_id);

            if (!bike) {
                throw new Error('bike_id not found');
            }

            if (bike.status_id) {
                throw new Error('Bike is not available for lease');
            }

            result = db.prepare(`
                INSERT INTO rides (start_time, start_lat, start_lon, user_id, bike_id)
                VALUES (datetime('now', 'localtime'), ?, ?, ?, ?)
            `).run(bike.lat, bike.lon, body.user_id, body.bike_id);

            const userResult = db.prepare(`UPDATE users SET ride_id =
                ${result.lastInsertRowid} WHERE id = ?`).run(body.user_id);

            if (userResult.changes === 0) {
                // TODO Delete inserted ride.
                throw new Error('user_id not found');
            }

            db.prepare(`UPDATE bikes SET (user_id, status_id, park_id) =
                (?, 1, 0) WHERE id = ?`).run(body.user_id, body.bike_id);

        } catch (err) {
            result = {
                changes: 0,
                message: err.message
            }
        }

        return result;
    },

    finishRide: function (body) {
        let result;

        try {
            // Get ride_id
            const user = db.prepare('SELECT ride_id FROM users WHERE id = ?').get(body.user_id);

            if (!user) {
                throw new Error('user_id not found');
            }

            const ride = db.prepare(`SELECT start_time, start_lat, start_lon, bike_id
                FROM rides WHERE id = ?`).get(user.ride_id);

            if (!ride) {
                throw new Error('No matching ride found for supplied user_id');
            }

            // Get bike
            const bike = db.prepare(`SELECT city_id, lat, lon FROM bikes WHERE id = ?`)
                .get(ride.bike_id);

            if (!bike) {
                throw new Error('bike_id for ride not found');
            }

            // Calculate price of trip
            const pricing = db.prepare(`SELECT * FROM pricing WHERE city_id = ?`)
                .get(bike.city_id);

            const duration = db.prepare(`SELECT unixepoch('now') - unixepoch(?, 'utc') AS sec`)
                .get(ride.start_time);

            let price = pricing.start_fee + pricing.minute_fee * duration.sec / 60;

            const parkIdStart = posInParkingZone(bike.city_id, ride.start_lat, ride.start_lon);
            const parkIdStop  = posInParkingZone(bike.city_id, bike.lat, bike.lon);

            // Reduced price if start outside p-zone and finish in p-zone
            if (!parkIdStart && parkIdStop) {
                price -= pricing.discount;
            }

            // Extra fee if finish outside p-zone
            if (!parkIdStop) {
                price += pricing.extra_fee;
            }

            price = Number(price.toFixed(2));

            // Update tables
            result = db.prepare(`
                UPDATE rides SET (duration, stop_lat, stop_lon, price) =
                (?, ?, ?, ?) WHERE id = ?
            `).run((duration.sec / 60).toFixed(2), bike.lat, bike.lon, price, user.ride_id);

            db.prepare(`UPDATE users SET (balance, ride_id) = (balance - ${price}, 0)
                WHERE id = ?`).run(body.user_id);

            db.prepare(`UPDATE bikes SET (user_id, status_id, park_id) =
                (0, 0, ?) WHERE id = ?`).run(parkIdStop, ride.bike_id);

            result.price = price;
        } catch (err) {
            result = {
                changes: 0,
                price: 0,
                message: err.message
            }
        }

        return result;
    },

    deleteRide: function (id) {
        return result = db.prepare('DELETE FROM rides WHERE id = ?').run(id);
    },



};

module.exports = dbModel;







