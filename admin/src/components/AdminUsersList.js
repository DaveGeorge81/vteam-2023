import React, { useEffect, useState } from "react";

const AdminUsersList = ({ setUserId, loading }) => {
    const [users, setUsers] = useState("");

    useEffect(() => {
        fetch(`http://localhost:1337/api/v1/users`, {method: 'GET'})
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [loading, users])

    function onClick(e, user) {
        setUserId(user);
        let toggled = document.getElementsByClassName("marked")[0];

        if (toggled) {toggled.className = ""};
        e.target.className = "marked";
    }

    const listItems = Array.from(users).map(user => <li key={user.id} onClick={(e) => onClick(e, user.id)}>Kund {user.id}</li>);

    return (
        <>
            <div className="admin-users-list">
                <ul>{listItems}</ul>
            </div>
        </>
    );
}

export default AdminUsersList;