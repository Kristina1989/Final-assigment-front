import React, { useContext, useRef, useState } from 'react';
import {useNavigate} from "react-router";
import MainContext from "../context/MainContext";

const Login = () => {

    const [status, setStatus] = useState(null)
    const nav = useNavigate()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const {setUser} = useContext(MainContext)

    function sendRequest() {

        if (usernameRef.current.value.length < 4) return setStatus("Username is too short")
        if (usernameRef.current.value.length > 20) return setStatus("Username is too long")
        if (passwordRef.current.value.length < 4) return setStatus("Password is too short")

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            checked: stayLoggedIn
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4000/login`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user)
                    nav("/")
                    if (stayLoggedIn) return localStorage.setItem("LoggedIn", "true")
                } else {
                    setStatus(data.message)
                }
            })
    }

    return (
        <div className="d-flex j-center a-center column">
            <h1>LOGIN</h1>
            <input ref={usernameRef} type="text" placeholder="Username"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <div>

                <label style={{color: 'darksalmon'}} htmlFor="stayLoggedIn">Stay Logged</label>
                <input style={{width: '20px', height: '20px'}} onClick={() => setStayLoggedIn(!stayLoggedIn)}
                       id="stayLoggedIn" type="checkbox"/>
                <button onClick={sendRequest}>Submit</button>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
};

export default Login;