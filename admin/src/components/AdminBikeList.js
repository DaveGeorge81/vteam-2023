import AdminMap from './AdminMap';
import React, { useState, useEffect } from "react";
import * as qs from 'qs';

let chargeBtn;

const AdminBikeList = ({city, coords}) => {
    const [bikeInfo, setBikeInfo] = useState("");
    const [bikeName, setBikeName] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [zoomLevel, setZoomLevel] = useState(5);
    const [bikes, setBikes] = useState("");
    const[stations, setStations] = useState("");
    const[loading, setLoading] = useState("");

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/stations/city/${city}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setStations(data))

        fetch(`http://localhost:1337/api/v1/bikes/city/${city}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setBikes(data))

        // nollställ inforutan om man byter stad och har klickat på en cykel
        setBikeInfo("");
        chargeBtn = "";
        // justera var kartan visar när ingen cykel är klickad
        setCoordinates(coords);
        setZoomLevel(9);
        setBikeName("");
    }, [city, loading])

    function onClick(bike) {
        let bikeVal = bikes.find(b => b.id === bike);

        setBikeName("Cykel " + bikeVal.id);

        let status;

        if (bikeVal.status_id === 0) {
            status = "Ledig";
        } else if (bikeVal.status_id === 1) {
            status = "Uthyrd";
        } else if (bikeVal.status_id === 2) {
            status = "Avstängd";
        } else if (bikeVal.status_id === 3) {
            status = "Laddas";
        }

        let station = [bikeVal.lat, bikeVal.lon];

        if (bikeVal.station_id !== 0) {
            station = `laddstation ${bikeVal.station_id}`
        } else if (bikeVal.park_id !== 0) {
            station = `parkering ${bikeVal.park_id}`
        }

        setBikeInfo(`Status: ${status}.
            Finns på ${station}.
            Hyrs av kund ${bikeVal.user_id} (0 = ingen).
            Hastighet: ${bikeVal.speed} km/h
            Batterinivå: ${bikeVal.battery} %`);
        setCoordinates([bikeVal.lat, bikeVal.lon]);
        setZoomLevel(22);

        if (bikeVal.battery < 30 & bikeVal.status_id !== 3) {
            chargeBtn = <button onClick={() => onChargeClick(bikeVal)} className="chargeBtn">Begär laddning</button>
        } else {
            chargeBtn = "";
        }
    }

    function onChargeClick(bike) {

        console.log(bike)
        
        // updateBike(stations, bike);

        // Återställa cykeln till ledig och annan position än laddstation
        // fetch(`http://localhost:1337/api/v1/bikes`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     },
        //     body: qs.stringify({id: bike.id, city_id: city, user_id: 0, status_id: 0, station_id: 0, park_id: 0, lat: 56.20, lon: 15.63, speed: 0, battery: bike.battery})
        // })
        // setLoading(bike.id);

        for (let i = 0; i < stations.length; i++) {
            console.log("num_free ", stations[i].num_free)
            if (stations[i].num_free > 0) {
                console.log("hej")
                let lat = stations[i].lat;
                let lon = stations[i].lon;
                let station = stations[i].id;

                fetch(`http://localhost:1337/api/v1/bikes`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    body: qs.stringify({id: bike.id, city_id: city, user_id: 0, status_id: 3, station_id: station, park_id: 0, lat: lat, lon: lon, speed: 0, battery: bike.battery})
                })
                .then(response => response.json())
                .then(data => console.log(data))

                setLoading(bike.id);

                break;
            }

            alert("Cykel schemalagd för laddning");
        }
    }

    const listItems = Array.from(bikes).map(bike => <li key={bike.id} onClick={() => onClick(bike.id)}>Cykel {bike.id}. Status: {bike.status_id}, {bike.rent} {bike.position} Batteri: {bike.battery}</li>);

    return (
        <>
            <div className="admin-bikes">
                <div className="admin-bikes-list">
                    <ul>{listItems}</ul>
                </div>
                <div>
                    <h1>{bikeName}</h1>
                    <AdminMap className="admin-bikes-map" mapPosition={coordinates} zoomLevel={zoomLevel} icons="Cyklar" cityId={city} reload={loading}/>
                    <div className="admin-bikes-info"><div className="bikeInfo">{bikeInfo}</div><div>{chargeBtn}</div></div>
                </div>
            </div>
        </>
    );
}

export default AdminBikeList;