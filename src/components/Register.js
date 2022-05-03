import {useRef, useState} from 'react';
import {useNavigate} from "react-router";

const Register = () => {

    const [status, setStatus] = useState(null)

    const nav = useNavigate()
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordTwoRef = useRef()

    function sendRequest() {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) return setStatus("Check email please")
        if (usernameRef.current.value.length < 4) return setStatus("Username is too short")
        if (usernameRef.current.value.length > 20) return setStatus("Username is too long")
        if (passwordRef.current.value.length < 4) return setStatus("Password is too short")
        if (passwordRef.current.value !== passwordTwoRef.current.value) return setStatus("Passwords don't match")

        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            passwordTwo: passwordTwoRef.current.value,
        }


        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        }

        fetch(`http://localhost:4003/register`, options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    nav("/login")
                } else {
                    setStatus(data.message)
                }
            })

    }

    return (
        <div>
            <div className="d-flex a-center column j-center">
                <h1>REGISTER</h1>
                <input ref={usernameRef} type="text" placeholder="Username"/>
                <input ref={emailRef} type="text" placeholder="Email"/>
                <input ref={passwordRef} type="text" placeholder="Password"/>
                <input ref={passwordTwoRef} type="text" placeholder="Repeat Password"/>
                <div>
                    <button onClick={sendRequest}>Submit</button>
                    <button onClick={() => nav(-1)}>Go back</button>
                    {status && <p>{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default Register;