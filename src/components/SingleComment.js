import React, {useEffect, useState} from 'react';
import http from "../plugins/http";

const SingleComment = ({comment}) => {

    const [userCommented, setUserCommented] = useState({})
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [link, setLink] = useState("")

    useEffect(() => {
        http.get("/getUserCommentInfo/" + comment.username).then(res => {
            if (res.success) {
                setUserCommented(res.user)
            }
            if (comment.urlRef.includes("youtube")) {
                const embedded = comment.urlRef.split("v=")[1].split("&")[0]
                setYoutubeUrl(embedded)
            } else if (comment.urlRef.includes("youtu.be")) {
                const embedded = comment.urlRef.split("/")
                const embedded2 = embedded[embedded.length - 1]
                setYoutubeUrl(embedded2)
            } else {
                setLink(comment.urlRef)
            }
        })
    }, [])

    return (
        <div className="d-flex a-center card">
            <div style={{margin: "20px 20px 0 20px",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",}}>
                <img style={{width: "50px", borderRadius: "50%"}} src={userCommented.userImage} alt=""/>
                <h3>{comment.username}</h3>
                <p>{new Intl.DateTimeFormat('lt-Lt', {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"}).format(comment.time)}</p>

            </div>
            <p>{comment.comment}</p>
            <div>
                {youtubeUrl !== "" &&
                    <iframe className="YTPlayer YTPlayerSM" src={`https://www.youtube.com/embed/${youtubeUrl}`}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>}

                {link !== "" && <img className="comment-url" src={link} alt=""/>}
            </div>
        </div>
    );
};

export default SingleComment;