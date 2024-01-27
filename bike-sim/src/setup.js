/**
 * Bike rental simulation setup.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const dbName = "bike-rentals";

const db = require('better-sqlite3')(`../backend/db/${dbName}.sqlite`);
const randomName = require('./utils.js').randomName;
const randomAccount = require('./utils.js').randomAccount;

let cities;
let stations;
let parkZones;
let pricing;

(async function() {
    // Import from ESM-module (using destructuring assignment)
    ({ cities, stations, parkZones, pricing } = await import("../data/db_data.mjs"));
})();

/**
 * Reset database and fill up with generated content.
 *
 * @param {number} numUsers Number of users.
 * @param {number[]} numBikesCity Number of bikes per city.
 */
exports.all = function(numUsers, numBikesCity) {
    // Setup cities
    db.prepare('DELETE FROM cities').run();

    for (const city of cities) {
        try {
            db.prepare(`
                INSERT INTO cities (name, lat, lon, dlat, dlon)
                VALUES (?, ?, ?, ?, ?)
            `).run(city.name, city.lat, city.lon, city.dlat, city.dlon);
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    }

    // Setup charging stations
    db.prepare('DELETE FROM stations').run();

    for (const [id, city] of stations.entries()) {
        const cityId = id + 1;

        for (const station of city) {
            const lat = cities[id].lat + station.lat_rel * cities[id].dlat;
            const lon = cities[id].lon + station.lon_rel * cities[id].dlon;

            try {
                db.prepare(`
                    INSERT INTO stations (city_id, num_free, num_total, lat, lon)
                    VALUES (?, ?, ?, ?, ?)
                `).run(cityId, station.num, station.num, lat, lon);
            } catch (err) {
                console.log(err.message);
                process.exit(1);
            }
        }
    }

    // Setup parking zones
    db.prepare('DELETE FROM park_zones').run();

    for (const [id, city] of parkZones.entries()) {
        const cityId = id + 1;

        for (const zone of city) {
            const lat = cities[id].lat + zone.lat_rel * cities[id].dlat;
            const lon = cities[id].lon + zone.lon_rel * cities[id].dlon;
            const dlat = zone.dlat_rel * cities[id].dlat;
            const dlon = zone.dlon_rel * cities[id].dlon;

            try {
                db.prepare(`
                    INSERT INTO park_zones (city_id, lat, lon, dlat, dlon, num_bikes)
                    VALUES (?, ?, ?, ?, ?, ?)
                `).run(cityId, lat, lon, dlat, dlon, 0);
            } catch (err) {
                console.log(err.message);
                process.exit(1);
            }
        }
    }

    // Setup pricing
    db.prepare('DELETE FROM pricing').run();

    for (const [id, price] of pricing.entries()) {
        const cityId = id + 1;

        try {
            db.prepare(`
                INSERT INTO pricing (city_id, start_fee, minute_fee, extra_fee, discount)
                VALUES (?, ?, ?, ?, ?)
            `).run(cityId, price.start, price.minute, price.extra, price.discount);
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    }

    // Setup users
    db.prepare('DELETE FROM users').run();

    for (let i = 0; i < numUsers; i++) {
        const name = randomName();
        const balance = 10 * Math.floor(1 + 50 * Math.random()); // 10 – 500
        let account = "";
        let withdraw = 0;

        // Not all users have a bank account and recurring withdraw
        if (Math.random() < 0.3) {
            account = randomAccount();
            withdraw = 100 * Math.floor(1 + 5 * Math.random()); // 100 – 500
        }

        try {
            db.prepare(`
                INSERT INTO users (name, balance, bank_account, recurring_withdraw)
                VALUES (?, ?, ?, ?)
            `).run(name, balance, account, withdraw);
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    }

    // Setup bikes
    db.prepare('DELETE FROM bikes').run();

    let parkZoneIdStart = 0;

    for (const [id, numBikes] of numBikesCity.entries()) {
        const cityId = id + 1;

        for (let i = 0; i < numBikes; i++) {
            // Generate a random bike position in city
            const latRel = 2 * Math.random() - 1; // -1 – +1
            const lonRel = 2 * Math.random() - 1;
            const lat = cities[id].lat + latRel * cities[id].dlat;
            const lon = cities[id].lon + lonRel * cities[id].dlon;

            // Check if position is in a parking zone
            let parkId = 0;

            for (const [zoneId, zone] of parkZones[id].entries()) {
                if (latRel >= zone.lat_rel - zone.dlat_rel &&
                    latRel <= zone.lat_rel + zone.dlat_rel &&
                    lonRel >= zone.lon_rel - zone.dlon_rel &&
                    lonRel <= zone.lon_rel + zone.dlon_rel) {
                    parkId = zoneId + 1 + parkZoneIdStart;
                    break;
                }
            }

            // Set battery level
            const battery = Math.floor(20 + 41 * Math.random()); // 20 – 60

            try {
                // Add bike to park_zone
                if (parkId) {
                    db.prepare(`UPDATE park_zones SET num_bikes = num_bikes + 1 WHERE id = ?`)
                        .run(parkId);
                }

                // Insert bike
                db.prepare(`
                    INSERT INTO bikes (city_id, park_id, lat, lon, battery)
                    VALUES (?, ?, ?, ?, ?)
                `).run(cityId, parkId, lat.toFixed(5), lon.toFixed(5), battery);
            } catch (err) {
                console.log(err.message);
                process.exit(1);
            }
        }
        parkZoneIdStart += parkZones[id].length;
    }

    // Clear rides
    db.prepare('DELETE FROM rides').run();
};

