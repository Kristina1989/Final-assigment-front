import {useContext, useRef} from 'react';
import http from "../plugins/http";
import mainContext from "../context/MainContext";

const UploadComment = ({topic, setTopic}) => {

    const {user} = useContext(mainContext)
    const commentRef = useRef()
    const urlRef = useRef()

    function sendRequest () {
        const comment = {
            themeId: topic._id,
            username: user.username,
            comment: commentRef.current.value,
            urlRef: urlRef.current.value
        }

        http.post("/uploadComment", comment).then(res => {
            if (res.success) {
                console.log(res)
                setTopic(res.topic)
            }
        })

    }

    return (
        <div className="d-flex column a-center">
            {/*<label htmlFor="w3review">Leave your comment:</label>*/}
            <textarea className="card" ref={commentRef} id="w3review" name="w3review" rows="10" cols="100" placeholder="Leave your comment here..."/>
            <input ref={urlRef}  type="text"/>
            <button onClick={sendRequest}>Submit</button>
        </div>
    );
};

export default UploadComment;