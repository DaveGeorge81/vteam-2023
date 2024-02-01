/**
 * Bike rental simulation update moving bikes, start and finish rides.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const dbName = "bike-rentals";

const db = require('better-sqlite3')(`../backend/db/${dbName}.sqlite`);
const baseURL = require("../data/config.js").baseURL;
const maxRidesCity = require("../data/config.js").maxRidesCity;
const minRideDuration = require("../data/config.js").minRideDuration;
const logRides = require("../data/config.js").logRides;
const Bike = require("./bike.js");

const bikesInRide = [];
const prevBikeId = [];
let prevUserId = -1;

(async function() {
    // Import from ESM-module
    const cities = (await import("../data/db_data.mjs")).cities;

    Bike.cities = cities;
    Bike.init();

    for (let i = 0; i < cities.length; i++) {
        bikesInRide.push(new Set());
        prevBikeId.push(-1);
    }
})();

/**
 * Update a city by starting and finishing rides, and moving bikes.
 *
 * @param {number} cityId City id.
 */
exports.updateCity = async function(cityId) {
    const timeStart = process.hrtime.bigint();
    const id = cityId - 1;

    // Move bikes and finish some rides
    for (const bike of bikesInRide[id]) {
        try {
            await bike.move();

            if (bike.duration > minRideDuration && Math.random() < 0.05) {
                await finish(bike);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    // Start new rides
    const diff = maxRidesCity[id] - bikesInRide[id].size;

    if (diff > 0) {
        const num = Math.ceil(0.1 * diff); // Start 10% of diff

        for (let i = 0; i < num; i++) {
            try {
                await start(cityId);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const timeEnd = process.hrtime.bigint();

    console.log(`Update city ${cityId}: ${(timeEnd - timeStart) / 1000000n} ms`);
};


/**
 * Start a new ride with an available user and bike in a city.
 *
 * @param {number} cityId City id.
 */
async function start(cityId) {
    // Find an available user (.pluck() returns first column as a scalar)
    // id > prevUserId is used to let all users start a ride
    const userId = db.prepare('SELECT id FROM users WHERE ride_id = 0 AND (id > ? OR id > -1)')
        .pluck().get(prevUserId);

    if (!userId) {
        console.log('rides.start(): No available user');
        return;
    }

    // Find an available bike
    const bike = db.prepare(`SELECT id, lat, lon, battery FROM bikes WHERE city_id = ?
        AND status_id = 0 AND battery > 0 AND (id > ? OR id > -1)`)
        .get(cityId, prevBikeId[cityId - 1]);

    if (!bike) {
        console.log('rides.start(): No available bike for city_id', cityId);
        return;
    }

    prevUserId = userId;
    prevBikeId[cityId - 1] = bike.id;

    if (logRides) {
        console.log(`*** Start ride, user: ${userId}, bike: ${bike.id} ***`);
    }

    // Create a Bike object and put in set
    bikesInRide[cityId - 1].add(new Bike(bike.id, cityId, bike.lat, bike.lon,
        bike.battery, userId));

    // Start a ride
    // const response =
    await fetch(`${baseURL}/rides`, {
        body: `user_id=${userId}&bike_id=${bike.id}`,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });
    // const result = await response.json();
    // console.log(result);
}


/**
 * Finish a ride.
 *
 * @param {Bike} bike The bike object.
 */
async function finish(bike) {
    if (logRides) {
        console.log(`––– Finish ride, user: ${bike.userId}, bike: ${bike.id} –––`);
    }

    // Update database
    // const response =
    await fetch(`${baseURL}/rides`, {
        body: `user_id=${bike.userId}`,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        method: "PUT"
    });
    // const result = await response.json();
    // console.log(result);

    // Remove bike from set
    bikesInRide[bike.cityId - 1].delete(bike);
}

