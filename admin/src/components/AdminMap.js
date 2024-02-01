import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet.markercluster';

const AdminMap = ({ className, mapPosition, zoomLevel, icons, cityId, clickedMarker, reload }) => {
    const mapContainer = useRef(null);
    const [markerList, setMarkerList] = useState([]);
    const [parkingList, setParkingList] = useState([]);
    const [chargeList, setChargeList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/bikes/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setMarkerList(data))

        fetch(`http://localhost:1337/api/v1/stations/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setChargeList(data))

        fetch(`http://localhost:1337/api/v1/park_zones/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setParkingList(data))
    }, [cityId, reload, icons])

    if (mapPosition === "") {
        mapPosition = [62.173276, 14.942265];
    } 

    const markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 13
    });
    const customMarker = require('../assets/scooter.png');
    const chargeMarker = require('../assets/charging.png');
    const parkingMarker = require('../assets/parking.png');

    useEffect(() => {
        let map = L.map('map').setView(mapPosition, zoomLevel);
        mapContainer.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let customIconBike = L.icon({
            iconUrl: customMarker,
            iconSize: [35, 35]
        });

        let customIconCharge = L.icon({
            iconUrl: chargeMarker,
            iconSize: [35, 35]
        });

        let customIconParking = L.icon({
            iconUrl: parkingMarker,
            iconSize: [35, 35]
        });

        if (icons === "") {
            Array.from(markerList).forEach((mark) => {
                const marker = L.marker([mark.lat, mark.lon], { icon: customIconBike })
                    .bindPopup(`Cykel ${mark.id}`)

                markers.addLayer(marker);
            })
            Array.from(chargeList).forEach((charge) => {
                const marker = L.marker([charge.lat, charge.lon], { icon: customIconCharge })
                    .bindPopup(`Laddstation ${charge.id}`)
                    .setZIndexOffset(5000)

                markers.addLayer(marker);
            })
            Array.from(parkingList).forEach((parking) => {
                const marker = L.marker([parking.lat, parking.lon], { icon: customIconParking })
                    .bindPopup(`Parkering ${parking.id}`)
                    .setZIndexOffset(5000)

                markers.addLayer(marker);
            })
        } else if (icons === "Laddstationer") {
            Array.from(chargeList).forEach((charge) => {
                const marker = L.marker([charge.lat, charge.lon], { icon: customIconCharge })
                    .bindPopup(`Laddstation ${charge.id}`)

                markers.addLayer(marker);
            })
        } else if (icons === "Cyklar") {
            Array.from(markerList).forEach((mark) => {
                const marker = L.marker([mark.lat, mark.lon], { icon: customIconBike })
                    .bindPopup(`Cykel ${mark.id}`)

                markers.addLayer(marker);
            })
        } else if (icons === "Parkeringar") {
            Array.from(parkingList).forEach((parking) => {
                const marker = L.marker([parking.lat, parking.lon], { icon: customIconParking })
                    .bindPopup(`Parkering ${parking.id}`)

                markers.addLayer(marker);
            })
        }

        map.addLayer(markers);

        markers.on("click", function (event) {
            let listItem = document.getElementById(event.layer._popup._content);

            if (listItem) {
                listItem.click();
            }
        });

        markers.eachLayer((marker) => {
            if(marker._popup._content === clickedMarker) {
                if (!marker._icon) marker.__parent.spiderfy();
                marker.openPopup();
            }
        })

        return () => {
        // map.off();
        map.remove();
        };
    }, [mapPosition, markerList, icons, clickedMarker]);

    return (<div id="map" className={`map ${className}`}></div>);
    
    }

export default AdminMap;
