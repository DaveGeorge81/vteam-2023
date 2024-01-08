import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as qs from 'qs';

let userString;
let btn1;
let btn2;

const AdminUsersInfo = ({ userId, setUserId, setLoading, loading }) => {
    const [userInfo, setUserInfo] = useState("");
    const [singleUser, setSingleUser] = useState("");
    const [userRides, setUserRides] = useState("");

    useEffect(() => {
        if (userId !== "") {
            fetch(`http://localhost:1337/api/v1/users/${userId}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => setSingleUser(data))

            fetch(`http://localhost:1337/api/v1/rides/user/${userId}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => setUserRides(data))

            let rides = "";

            for (let i = 0; i < userRides.length; i++) {
                rides = `⚬ ${userRides[i].start_time}: Från ${userRides[i].start_lat}, ${userRides[i].start_lon} till ${userRides[i].stop_lat}, ${userRides[i].stop_lon}
                Restid: ${userRides[i].duration} Pris: ${userRides[i].price}`
            }
            setUserInfo(`${singleUser.name}. Saldo: ${singleUser.balance}.
            Bank-konto: ${singleUser.bank_account}. Återkommande dragning: ${singleUser.recurring_withdraw}

            Resor:
            ${rides}`);
        }
    }, [userId, singleUser, loading])

    function remove(userId) {
        alert("Användare raderad");

        fetch(`http://localhost:1337/api/v1/users/${userId}`, {method: 'DELETE'});

        setLoading(userId);
        setUserId("");
        setUserInfo("");
        userString = "";
        btn1 = "";
        btn2 = "";
    }

    /// lägg till, bara för att kunna testa
    function onClickAdd() {
        fetch(`http://localhost:1337/api/v1/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: qs.stringify({name: "Hej", balance: 0, bank_account: 8193183193, recurring_withdraw: 0})
        })
        .then(response => response.json())
        .then(data => console.log(data))

        setLoading(userId);
    }

    function onClickRemove(userId) {
        confirmAlert({
            title: 'Godkänd för att radera',
            message: `Vill du verkligen ta bort kund ${userId}?`,
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => remove(userId)
                },
                {
                label: 'Nej'
                }
            ]
        });
    }

    if (userId !== "") {
        userString = "Kund";
        btn1 = <button className="chargeBtn" onClick={() => onClickAdd()}>Lägg till kund</button> // bara för att testa
        btn2 = <button className="chargeBtn" onClick={() => onClickRemove(userId)}>Ta bort kund</button>
    } else if (userId === "") {
        userString = "";
        btn1 = "";
        btn2 = "";
    }

    return (
        <>
            <div className="admin-users-info">
                <h1>{userString} {userId}</h1>
                <div><div className="bikeInfo">{userInfo}</div></div>
                <div className="userBtns">
                    {btn1}
                    {btn2}
                </div>
            </div>
        </>
    );
}

export default AdminUsersInfo;