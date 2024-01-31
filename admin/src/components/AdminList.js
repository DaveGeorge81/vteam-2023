import React, { useState, useEffect } from "react";

const AdminList = ({ city, cityId, setClickedMarker, setCityCoordinates }) => {
    const [listTitle, setListTitle] = useState("");
    const [listInfo, setListInfo] = useState("");
    const [stations, setStations] = useState("");
    const [parking, setParking] = useState("");
    const [bikes, setBikes] = useState("");
    const [parkId, setParkId] = useState("");

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/stations/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setStations(data))

        fetch(`http://localhost:1337/api/v1/park_zones/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setParking(data))

        fetch(`http://localhost:1337/api/v1/bikes/city/${cityId}`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setBikes(data))
    }, [cityId, parkId])

    function onClick(station) {
        let stationBikes = [];

        for (let i = 0; i < bikes.length; i++) {
            if (bikes[i].station_id === station.id) {
                console.log(bikes[i])
                stationBikes.push(` Cykel ${bikes[i].id}`);
            }
        }
        setListTitle(`Laddstation ${station.id}`);
        setListInfo(`Laddstation ${station.id} har koordinaterna ${station.lat}, ${station.lon}

        Antal lediga platser: ${station.num_free} av ${station.num_total}

        Cyklar på station: ${stationBikes}`);
        setClickedMarker(`Laddstation ${station.id}`);
        setCityCoordinates([station.lat, station.lon]);
    }

    function onClickPark(park) {
        let parkBikes = [];

        for (let i = 0; i < bikes.length; i++) {
            if (bikes[i].park_id === park.id) {
                parkBikes.push(` Cykel ${bikes[i].id}`);
            }
        }
        setParkId(park.id);

        setListTitle(`Parkering ${park.id}`);
        setListInfo(`Parkering ${park.id} har koordinaterna ${park.lat}, ${park.lon}

        Antal parkerade cyklar: ${park.num_bikes}

        Cyklar på parkering: ${parkBikes}`);
        setClickedMarker(`Parkering ${park.id}`);
        setCityCoordinates([park.lat, park.lon]);
    }

    let listItemsStation;
    let listItemsParking;

    if (city !== "") {
        listItemsStation = Array.from(stations).map(station => <li key={station.id} id={`Laddstation ${station.id}`} onClick={() => onClick(station)}>Laddstation {station.id}</li>);
        listItemsParking = Array.from(parking).map(park => <li key={park.id} id={`Parkering ${park.id}`} onClick={() => onClickPark(park)}>Parkering {park.id}</li>);
    }

    return (
        <>
            <div className="adminList">
                <div>
                    <h1>{city} stationer</h1>
                    <ul>{listItemsStation}{listItemsParking}</ul>
                </div>
                <div className="listInfo">
                <h1>{listTitle}</h1>
                    {listInfo}
                </div>
            </div>
        </>
    );
}

export default AdminList;