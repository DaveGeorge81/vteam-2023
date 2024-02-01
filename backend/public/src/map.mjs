/* global L */

import "./leaflet.js";
import { cities, stations, parkZones } from "../data/db_data.mjs";

const baseURL = "http://localhost:1337/api/v1";

const map = L.map('map', {
    wheelDebounceTime: 100,
    wheelPxPerZoomLevel: 300,
    zoomSnap: 0,
    zoomDelta: 0.5
}).setView([cities[0].lat, cities[0].lon], 13.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const selCity = document.getElementById('sel-city');

selCity.addEventListener("change", (event) => {
    const id = parseInt(event.target.value);
    const city = cities[id];
    const bounds = [
        [city.lat - city.dlat, city.lon - city.dlon],
        [city.lat + city.dlat, city.lon + city.dlon]
    ];

    map.fitBounds(bounds, {
        padding: [20, 20]  // pixels
    });
});

for (const [id, city] of cities.entries()) {
    // Add option to select
    let option = document.createElement("option");

    option.setAttribute("value", id);
    option.textContent = city.name;

    if (id === 0) {
        option.setAttribute("selected", "");
    }

    selCity.appendChild(option);

    // Draw city bounds
    const bounds = [
        [city.lat - city.dlat, city.lon - city.dlon],
        [city.lat + city.dlat, city.lon + city.dlon]
    ];

    L.rectangle(bounds, {
        color: '#a55',
        fill: false,
        opacity: 0.5,
        dashArray: "10"
    }).addTo(map);

    // Draw charging stations
    for (const station of stations[id]) {
        const lat = city.lat + station.lat_rel * city.dlat;
        const lon = city.lon + station.lon_rel * city.dlon;

        const chargeIcon = L.icon({
            iconUrl: "../img/charging-battery.png",
            iconSize: [40, 40]
        });

        L.marker([lat, lon], {
            icon: chargeIcon
        }).addTo(map);
    }

    // Draw parking zones
    for (const zone of parkZones[id]) {
        const lat = city.lat + zone.lat_rel * city.dlat;
        const lon = city.lon + zone.lon_rel * city.dlon;
        const dlat = zone.dlat_rel * city.dlat;
        const dlon = zone.dlon_rel * city.dlon;

        const bounds = [
            [lat - dlat, lon - dlon],
            [lat + dlat, lon + dlon]
        ];

        L.rectangle(bounds, {
            color: '#55a',
            opacity: 0.5,
            fillOpacity: 0.15,
            dashArray: "7",
            weight: 2
        }).addTo(map);
    }
}

const bikeMarkers = [];
const bikeTracks = [];

async function updateBikes(cityId) {
    const response = await fetch(`${baseURL}/bikes/city/${cityId}`);
    const bikesData = await response.json();

    bikesData.forEach((bike) => {
        const popupContent = `
            Bike ${bike.id}<br>
            User ${bike.user_id}, Status ${bike.status_id}<br>
            Speed ${bike.speed} m/s, Battery ${bike.battery} %
        `;

        const bikePos = [bike.lat, bike.lon];
        let bikeClass;

        switch (bike.status_id) {
            case 0:
                bikeClass = "green-bike-icon";

                if (bike.battery < 15) {
                    bikeClass = "orange-bike-icon";
                }
                break;
            case 1:
                bikeClass = "blue-bike-icon";

                if (bike.battery < 15) {
                    bikeClass = "violet-bike-icon";
                }
                break;
        }

        if (bike.battery === 0) {
            bikeClass = "red-bike-icon";
        }

        if (bikeMarkers[bike.id]) {
            // Update marker
            const marker = bikeMarkers[bike.id];
            const track = bikeTracks[bike.id];

            marker.setLatLng(bikePos);
            marker.setTooltipContent(popupContent);
            // marker.setPopupContent(popupContent);

            if (marker.getIcon().className !== bikeClass) {
                const bikeIcon = L.divIcon({
                    className: bikeClass,
                    iconSize: [13, 13]
                });

                marker.setIcon(bikeIcon);
            }

            track.addLatLng(bikePos);
        } else {
            // Create a new marker and popup
            const bikeIcon = L.divIcon({
                className: bikeClass,
                iconSize: [13, 13]
            });

            const marker = L.marker(bikePos, {
                icon: bikeIcon
            }).bindTooltip(popupContent, {
                className: 'tooltip-text',
                opacity: 0.85
            }).addTo(map);
            // }).bindPopup(popupContent).addTo(map);

            const track = L.polyline([bikePos], {
                color: '#777',
                opacity: 0.5,
                dashArray: "5"
            }).addTo(map);

            bikeMarkers[bike.id] = marker;
            bikeTracks[bike.id] = track;
        }
    });
}

function startUpdateTimer(cityId) {
    setInterval(updateBikes, 2130, cityId);
    cityId++;

    if (cityId <= cities.length) {
        setTimeout(startUpdateTimer, 710, cityId);
    }
}

startUpdateTimer(1);

