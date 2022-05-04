import React, { useContext, useEffect, useState } from 'react';
import http from "../plugins/http";
import SingleTopic from "./SingleTopic";
import mainContext from "../context/MainContext";

const Home = () => {

    const {setFavorites} = useContext(mainContext)
    const [topics, setTopics] = useState([])



    useEffect(() => {
        http.get("/getAllTopics").then(res => {
            if (res.success) {
                setTopics(res.topics)
            }
        })
    }, [])

    useEffect(() => {
        const keys = ["_id"]
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values) {
            const result = topics.filter(function(e) {
                return keys.every(function(a) {
                    return values.includes(e[a])
                })
            })
            setFavorites(result)
        }
    },[])

    return (
        <div>
            <div>
                {topics.map((x, i) => <SingleTopic key={i} topic={x} />)}
            </div>
        </div>
    );
};

export default Home;