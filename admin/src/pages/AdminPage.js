import AdminMap from '../components/AdminMap';
import AdminList from '../components/AdminList';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function Admin() {
    const [cityCoordinates, setCityCoordinates] = useState([56.193, 15.628]);
    const [cityName, setCityName] = useState("Karlskrona");
    const [cityId, setCityId] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [icons, setIcons] = useState("");
    const [cities, setCities] = useState("");
    const [clickedMarker, setClickedMarker] = useState("");
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/cities`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setCities(data))
    }, [])

    let optionItems = Array.from(cities).map(city => <option key={city.id} value={city.name}>{city.name}</option>);

    function onChange(value) {
        let city = cities.find(c => c.name === value);

        setCityName(city.name);
        setCityId(city.id);
        setCityCoordinates([city.lat, city.lon]);
        setZoomLevel(14);
        setLoading(city)
    }

    function onIconChange(value) {
        setIcons(value);
    }

    return (
        <>
            <div className="admin">
            <header className="admin-header">
                <span>Admins vy</span>
                <div className="admin-header-links">
                <Link to="/admin-bikes" className="link">Hantera cyklar</Link>
                <Link to="/admin-users" className="link">Hantera kunder</Link>
                </div>
            </header>
            <div className="admin-choices">
                <select onChange={(event) => onChange(event.target.value)}>
                    {/* <option value="">Välj stad</option> */}
                    {optionItems}
                    {/* <option value="">Välj stad</option>
                    <option value={"Stockholm"}>Stockholm</option>
                    <option value={"Göteborg"}>Göteborg</option>
                    <option value={"Malmö"}>Malmö</option> */}
                </select>
                <select onChange={(event) => onIconChange(event.target.value)}>
                    <option value="">Visa allt</option>
                    <option value="Laddstationer">Laddstationer</option>
                    <option value="Parkeringar">Parkeringar</option>
                    <option value="Cyklar">Cyklar</option>
                </select>
            </div>
            <div className="admin-container">
                <AdminMap className="admin-map" mapPosition={cityCoordinates} zoomLevel={zoomLevel} icons={icons} cityId={cityId} clickedMarker={clickedMarker} reload={loading}/>
                <AdminList city={cityName} cityId={cityId} setClickedMarker={setClickedMarker} setCityCoordinates={setCityCoordinates}/>
            </div>
            </div>
        </>
    )
}
