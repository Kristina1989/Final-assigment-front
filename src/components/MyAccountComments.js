import {useContext, useEffect, useState} from 'react';
import mainContext from "../context/MainContext";
import http from "../plugins/http";

const MyAccountComments = () => {

    const {user} = useContext(mainContext)
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (user?.username) {
            http.get("/getMyComments/" + user.username).then(res => {
                console.log(res)
                if (res.success) {
                    setComments(res.myComments)
                }
            })
        }
    }, [user])



    return (
        <div>
            {comments.map((comment, i) => <div className="card" key={i}>

                <h3>by {comment.username}</h3>
                <p>{new Intl.DateTimeFormat('lt-Lt', {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"}).format(comment.time)}</p>
                <p>{comment.comment}</p>

            </div>)}
        </div>
    );
};

export default MyAccountComments;