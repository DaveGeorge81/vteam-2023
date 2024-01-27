/**
 * Bike rental simulation Bike class.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const baseURL = require("../data/config.js").baseURL;
const minDistanceUpdate = require("../data/config.js").minDistanceUpdate;
const batteryDischarge = require("../data/config.js").batteryDischarge;

module.exports = class Bike {
    static cities = []; // Assign this static and call init() before instantiating
    static dxTodlon = [];
    static dyTodlat = [];

    constructor(id, cityId, lat, lon, battery, userId) {
        this.id = id;
        this.cityId = cityId;
        this.city = Bike.cities[this.cityId - 1];
        this.lat = lat;
        this.lon = lon;
        this.battery = battery;
        this.userId = userId;
        this.speed = Math.floor(10 + 21 * Math.random()); // 10 – 30 km/h

        const alpha = 2 * Math.PI * Math.random();        // 0 – 2𝛑 (driving direction)
        const xVel = this.speed * Math.cos(alpha) / 3.6;  // m/s
        const yVel = this.speed * Math.sin(alpha) / 3.6;  // m/s

        this.lonVel = xVel / Bike.dxTodlon[this.cityId - 1]; // deg/s
        this.latVel = yVel / Bike.dyTodlat[this.cityId - 1]; // deg/s
        this.startTime = Date.now(); // ms
        this.updated = this.startTime;
    }

    static init() {
        // Assign cities before calling this method

        /* Compute length in m of a degree longitude and latitude respectively
         * at city centers (length is a function of the latitude)
         *
         * ref: https://en.wikipedia.org/wiki/Geographic_coordinate_system
         */
        for (const city of this.cities) {
            const phi = city.lat * Math.PI / 180;

            this.dxTodlon.push(111412.84 * Math.cos(phi) - 93.5 * Math.cos(3*phi) +
                0.118 * Math.cos(5*phi));
            this.dyTodlat.push(111132.92 - 559.82 * Math.cos(2*phi) + 1.175 * Math.cos(4*phi) -
                0.0023 * Math.cos(6*phi));
        }
    }

    // Duration of ride in seconds
    get duration() {
        return 0.001 * (Date.now() - this.startTime);
    }

    async move() {
        const time = Date.now();
        const dTime = 0.001 * (time - this.updated); // s

        // Check if bike has moved enough to worth update database
        const distance = this.speed * dTime / 3.6;

        // console.log(this.id, distance, this.battery);

        if (distance < minDistanceUpdate) {
            return;
        }

        this.updated = time;
        let dlon = this.lonVel * dTime;
        let dlat = this.latVel * dTime;

        // console.log(dlon, dlat);

        // Keep bike inside city
        if (this.lon + dlon >= this.city.lon + this.city.dlon ||
            this.lon + dlon <= this.city.lon - this.city.dlon) {
            dlon = -dlon;
            this.lonVel = -this.lonVel;
        }

        if (this.lat + dlat >= this.city.lat + this.city.dlat ||
            this.lat + dlat <= this.city.lat - this.city.dlat) {
            dlat = -dlat;
            this.latVel = -this.latVel;
        }

        this.lon += dlon;
        this.lat += dlat;

        // console.log(dlon, dlat);

        // Discharge battery
        this.battery -= batteryDischarge * distance;

        if (this.battery < 0) {
            this.battery = 0;
            this.speed = 0;
        }

        // Update database
        const lon = (this.lon).toFixed(5);
        const lat = (this.lat).toFixed(5);
        const battery = (this.battery).toFixed(1);

        // console.log(this.id, lon, lat, battery);

        await fetch(`${baseURL}/bikes/pos_speed_batt`, {
            body: `id=${this.id}&lat=${lat}&lon=${lon}&speed=${this.speed}&battery=${battery}`,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "PUT"
        });
        // const result = await response.json();
        // console.log(result);
    }
};

