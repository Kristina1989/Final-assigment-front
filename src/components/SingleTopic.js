import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router";
import mainContext from "../context/MainContext";

const SingleTopic = ({topic}) => {

    const nav = useNavigate()
    const {getFavorites, setFavoritesIds} = useContext(mainContext)
    const [getWatching, setWatching] = useState(false)

    useEffect(() => {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values &&  values.includes(topic._id)) {
            return setWatching(true)
        } else {
            return setWatching(false)
        }
    }, [getFavorites])

    function addToFavorites() {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values.includes(topic._id)) {
            const index = values.indexOf(topic._id)
            values.splice(index, 1)
        } else {
            values.push(topic._id)
        }
        localStorage.setItem('favorites', JSON.stringify(values));
        setFavoritesIds(values)
        setWatching(!getWatching)
    }



    return (
        <div className="card">
            <div className="d-flex s-evenly a-center small-screen-column">
                <h2 className="topic-hover" onClick={() => nav("/" + topic._id)}>{topic.title} </h2> <h3 style={{color: "white"}}>by {topic.username}</h3>
                <p style={{color: "white"}}>Comments: {topic.comments.length}</p>
                <div className="favorite-symbol" onClick={addToFavorites}
                     style={{color: getWatching ? 'red' : 'lightgray'}}>♥
                </div>
            </div>

        </div>
    );
};

export default SingleTopic;