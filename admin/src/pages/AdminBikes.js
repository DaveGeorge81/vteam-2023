import AdminBikeList from '../components/AdminBikeList';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminBikes() {
    const [cities, setCities] = useState("");
    const [cityId, setCityId] = useState(1);
    const [cityName, setCity] = useState("Karlskrona");
    const [coordinates, setCoordinates] = useState([56.193, 15.628]);

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/cities`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setCities(data))
    }, [])

    let optionItems = Array.from(cities).map(city => <option key={city.id} value={city.id}>{city.name}</option>);

    function onChange(value) {
        let city = cities.find(c => c.id === Number(value));

        setCityId(value);
        setCity(city.name);
        setCoordinates([city.lat, city.lon]);
    }

    return (
        <>
            <div className="admin">
            <header className="admin-header">
                <span><Link to="/admin">Admins vy</Link></span>
                <div className="admin-header-links">
                <span>Hantera cyklar</span>
                <Link to="/admin-users" className="link">Hantera kunder</Link>
                </div>
            </header>
            <h1 className="bike-h1">Alla cyklar i {cityName}</h1>
            <select onChange={(event) => onChange(event.target.value)} className="bike-select">
                    {/* <option value="">Välj stad</option> */}
                    {optionItems}
            </select>
            <div className="admin-container">
                <AdminBikeList city={cityId} coords={coordinates}/>
            </div>
            </div>
        </>
    )
}