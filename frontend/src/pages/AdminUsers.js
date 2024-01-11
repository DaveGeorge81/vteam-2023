import AdminUsersList from '../components/AdminUsersList';
import AdminUsersInfo from '../components/AdminUsersInfo';
import { Link } from "react-router-dom";
import React, { useState } from 'react';

export default function AdminUsers() {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState("");

    return (
        <>
            <div className="admin">
            <header className="admin-header">
                <span><Link to="/admin">Admins vy</Link></span>
                <div className="admin-header-links">
                <Link to="/admin-bikes" className="link">Hantera cyklar</Link>
                <span>Hantera kunder</span>
                </div>
            </header>
            <h1 className="bike-h1">Alla kunder</h1>
            <div className="admin-container">
                <div className="admin-users">
                    {/* <div className="admin-users-list">
                        <ul>{listItems}</ul>
                    </div>
                    {/* <div className="admin-users-info">
                        <h1>{userString} {userId}</h1>
                        <div><div className="bikeInfo">{userInfo}</div></div>
                    </div> */}
                    <AdminUsersList setUserId={setUserId} loading={loading}/>
                    <AdminUsersInfo userId={userId} setUserId={setUserId} setLoading={setLoading} loading={loading}/>
                </div>
                {/* <AdminUsersList /> */}
            </div>
            </div>
        </>
    )
}