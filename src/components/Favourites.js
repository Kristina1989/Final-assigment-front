import React, { useContext, useEffect } from 'react';
import SingleTopic from "./SingleTopic";
import mainContext from "../context/MainContext";
import http from "../plugins/http";

const Favourites = () => {

    const {getFavorites, setFavorites, getFavoritesIds} = useContext(mainContext)

    useEffect(() => {
        async function fetchData () {
        const allPostData = await http.get('/getAllTopics')
        if (allPostData.success) {
            const data = allPostData.topics
            const keys = ["_id"]
            const values = await JSON.parse(localStorage.getItem('favorites'))
            if (values) {
                const result = data.filter(function (e) {
                    return keys.every(function (a) {
                        return values.includes(e[a])
                    })
                })
                setFavorites(result)
            }
        }}
        fetchData()
    }, [getFavoritesIds])

    return (
        <div>
          <div className="d-flex j-center">
              <h1 >My Favorites</h1>
          </div>
            {getFavorites.map((x, i) => <SingleTopic key={i} topic={x} />)}
        </div>
    );
};

export default Favourites;