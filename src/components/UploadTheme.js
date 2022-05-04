import React, { useContext, useRef, useState } from 'react';
import {useNavigate} from "react-router";
import mainContext from "../context/MainContext";
import http from "../plugins/http";

const UploadTheme = () => {

    const {user} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const titleRef = useRef()
    const commentRef = useRef()
    const photoUrlRef = useRef()
    const nav = useNavigate()

    function sendRequest() {
        if (titleRef.current.value < 4) return setStatus("Title has to be at least 4 symbols long")
        if (commentRef.current.value.length < 10) return setStatus("Comment has to be at least 10 symbols long")

        const theme = {
            title: titleRef.current.value,
            comment: commentRef.current.value,
            photoUrl: photoUrlRef.current.value,
            username: user.username,
        }
        http.post("/upload", theme).then(res => {
            if (res.success) {
                nav("/")
            } else {
                setStatus(res.message)
            }
        })
    }

    return (
        <div className="card d-flex column a-center">
            <h1>Create Theme</h1>
            <input ref={titleRef} type="text" placeholder="Theme Title"/>
            <input ref={commentRef} type="text" placeholder="Comment"/>
            <input ref={photoUrlRef} type="text" placeholder="Photo URL"/>
            <button onClick={sendRequest}>Upload</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default UploadTheme;