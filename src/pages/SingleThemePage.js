import React, {useContext, useEffect, useState} from 'react';
import SingleComment from "../components/SingleComment";
import MyThemeComment from "../components/MyThemeComment";
import UploadComment from "../components/UploadComment";
import http from "../plugins/http";
import {useParams} from "react-router";
import mainContext from "../context/MainContext";

const SingleThemePage = () => {

    const {user} = useContext(mainContext)
    const {theme} = useParams()
    const [topic, setTopic] = useState([])

    useEffect(() => {
        http.get("/getTheme/" + theme).then(res => {
            if (res.success) {
                setTopic(res.theme)
            }
        })
    }, [])

    return (
        <div>
            <MyThemeComment topic={topic}/>
            {topic.comments?.map((x, i) => <SingleComment key={i} comment={x} />)}
            {user && <UploadComment topic={topic} setTopic={setTopic} />}
        </div>
    );
};

export default SingleThemePage;