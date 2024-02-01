/**
 * Bike rental simulation configuration data.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const baseURL = "http://server:1337/api/v1"; // If run via Docker compose
//const baseURL = "http://localhost:1337/api/v1";
const numUsers = 700;                // Should be greater than sum of maxRidesCity
const numBikesCity = [91, 751, 158]; // [Karlskrona, Stockholm, Helsingborg]
const maxRidesCity = [60, 370, 70];  // Should be smaller than numBikesCity
const minRideDuration = 60;    // seconds
const minDistanceUpdate = 20;  // Min travel distance for bike to update database (m)
const batteryDischarge = 0.02; // Percentage points discharge per meter
const logRides = true;         // Write started and finished rides to console

module.exports = { baseURL, numUsers, numBikesCity, maxRidesCity,
    minRideDuration, minDistanceUpdate, batteryDischarge, logRides };
