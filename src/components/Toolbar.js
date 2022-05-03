import {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import MainContext from "../context/MainContext";
import http from "../plugins/http";

const Toolbar = () => {

    const {user, setUser, getFavoritesIds, notifications, setNotifications} = useContext(MainContext)
    const nav = useNavigate()


    useEffect(() => {
        http.get('/getNotifications').then (res=> {
            if (res.success) setNotifications(res.findNotifications)
        })
    }, [user, notifications])


    function sendRequest() {

        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
        }

        fetch(`http://localhost:4002/logout`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    nav("/")
                    setUser(null)
                    localStorage.clear()
                }
            })
    }

    return (
        <div className="d-flex s-btv p100 toolbar-line">
            <h1 style={{cursor: 'pointer'}} onClick={() => nav('/')}>Simple Forum</h1>
            <div>
                {user && <button onClick={() => nav("/myAccount")}>My Account</button>}
                {user && <button onClick={() => nav("/notifications")}>Notifications: ({notifications.length})</button>}
                <button onClick={() => nav("/favorites")}>Favourites ({getFavoritesIds.length})</button>
                {user && <button onClick={() => nav("/upload")}>New Theme</button>}
                {!user && <button onClick={() => nav("/register")}>Register</button>}
                {!user && <button onClick={() => nav("/login")}>Login</button>}
                {user && <button onClick={sendRequest}>Logout</button>}
            </div>
        </div>
    );
};

export default Toolbar;