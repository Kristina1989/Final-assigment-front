import React, {useState, useEffect, useContext} from 'react';
import SingleTopic from "./SingleTopic";
import http from "../plugins/http";
import mainContext from "../context/MainContext";

const MyAccountTopics = () => {

    const {user} = useContext(mainContext)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        if (user?.username) {
            http.get("/getMyTopics/" + user.username).then(res => {
                if (res.success) {
                    setTopics(res.myTopics)
                }
            })
        }
    }, [user])

    return (
        <div>
            {topics.length > 0 ?
                topics.map((x, i) => <SingleTopic topic={x} key={i} />

                )
            :   <div className="d-flex j-center">
                    <h4 style={{color: "red"}}>No topics in the list</h4>
                </div> }
        </div>
    );
};

export default MyAccountTopics;