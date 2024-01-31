import AdminMap from './AdminMap';
import React, { useState, useEffect } from "react";
import * as qs from 'qs';

let chargeBtn;
let offBtn;
let bikeUser;

const AdminBikeList = ({city, coords}) => {
    const [bikeInfo, setBikeInfo] = useState("");
    const [bikeName, setBikeName] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [zoomLevel, setZoomLevel] = useState(13);
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
        offBtn = "";
        // justera var kartan visar när ingen cykel är klickad
        setCoordinates(coords);
        setZoomLevel(13);
        setBikeName("");
    }, [city, loading, coords])

    function onClick(e, bike) {
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

        if (bikeVal.user_id === 0 ? bikeUser = "ingen" : bikeUser = bikeVal.user_id);

        setBikeInfo(`Status: ${status}.
            Finns på ${station}.
            Hyrs av kund: ${bikeUser}.
            Hastighet: ${bikeVal.speed} km/h
            Batterinivå: ${bikeVal.battery} %`);
        setCoordinates([bikeVal.lat, bikeVal.lon]);
        setZoomLevel(22);

        if (bikeVal.battery < 30 & bikeVal.status_id !== 3 & bikeVal.status_id !== 1) {
            chargeBtn = <button onClick={() => onChargeClick(bikeVal)} className="chargeBtn">Begär laddning</button>
        } else {
            chargeBtn = "";
        }

        offBtn = <button onClick={() => onOffClick(bikeVal)} className="offBtn">Stäng av cykel</button>;

        let toggled = document.getElementsByClassName("marked")[0];

        if (toggled) {toggled.className = ""};
        e.target.className = "marked";
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
                    body: qs.stringify({id: bike.id, city_id: city, user_id: 0, status_id: 0, station_id: station, park_id: 0, lat: lat, lon: lon, speed: 0, battery: bike.battery})
                })
                .then(response => response.json())
                .then(data => console.log(data))

                fetch(`http://localhost:1337/api/v1/bikes/start_charge`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    body: qs.stringify({bike_id: bike.id, station_id: station})
                })
                .then(response => response.json())
                .then(data => console.log(data))

                setLoading(bike.id);
                alert("Cykel schemalagd för laddning");

                break;
            }
            // setCoordinates([bike.lat, bike.lon]);
            // coords = [bike.lat, bike.lon];
            // setZoomLevel(22);
        }
    }

    function onOffClick(bike) {
        console.log(bike)

        fetch(`http://localhost:1337/api/v1/bikes/user_status_station_park`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: qs.stringify({id: bike.id, user_id: 0, status_id: 2, station_id: bike.station_id, park_id: bike.park_id})
        })
        .then(response => response.json())
        .then(data => console.log(data))

        setLoading(bike.id);

        alert("Cykel avstängd");
    }

    const listItems = Array.from(bikes).map(bike => <li key={bike.id} id={`Cykel ${bike.id}`} onClick={(e) => onClick(e, bike.id)}>Cykel {bike.id}. Status: {bike.status_id}, {bike.rent} {bike.position} Batteri: {bike.battery}</li>);

    return (
        <>
            <div className="admin-bikes">
                <div className="admin-bikes-list">
                    <ul>{listItems}</ul>
                </div>
                <div>
                    <h1>{bikeName}</h1>
                    <AdminMap className="admin-bikes-map" mapPosition={coordinates} zoomLevel={zoomLevel} icons="Cyklar" cityId={city} reload={loading}/>
                    <div className="admin-bikes-info"><div className="bikeInfo">{bikeInfo}</div><div>{offBtn}{chargeBtn}</div></div>
                </div>
            </div>
        </>
    );
}

export default AdminBikeList;