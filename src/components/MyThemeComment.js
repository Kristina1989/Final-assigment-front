import React from 'react';

const MyThemeComment = ({topic}) => {
    return (
        <div className="card">

            <div className="d-flex s-evenly small-screen-column">
                <h3>{topic.title}</h3> <h3>author: {topic.username}</h3>
                <p>Time: {new Intl.DateTimeFormat('lt-Lt', {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"}).format(topic.time)}</p>
            </div>
            <div className="d-flex s-evenly a-center">
                <img style={{width: "200px", margin: "10px"}} src={topic.photoUrl} alt=""/>
                <p>{topic.comment}</p>

            </div>

        </div>
    );
};

export default MyThemeComment;