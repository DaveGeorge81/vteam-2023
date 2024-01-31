/**
 * Bike rental system simulation.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const numUsers = require("./data/config.js").numUsers;
const numBikesCity = require("./data/config.js").numBikesCity;
const setupAll = require("./src/setup.js").all;
const rides = require("./src/rides.js");
//const cities = require('./src/db_data.js').cities;
let cities;

function startUpdateTimer(cityId) {
    setInterval(rides.updateCity, 2100, cityId);
    cityId++;

    if (cityId <= cities.length) {
        setTimeout(startUpdateTimer, 700, cityId);
    }
}

(async function() {
    // Import from ESM-module
    cities = (await import("./data/db_data.mjs")).cities;

    setupAll(numUsers, numBikesCity);
    startUpdateTimer(1);
})();

