import React, { useContext, useRef, useState } from 'react';
import MyAccountTopics from "./MyAccountTopics";
import MyAccountComments from "./MyAccountComments";
import mainContext from "../context/MainContext";
import http from "../plugins/http";



const MyAccount = () => {

    const {user, setUser} = useContext(mainContext)
    const [show, setShow] = useState(true)
    const imgUrlRef = useRef()

    function changeUserImg () {
        const image = {
            username: user.username,
            imgUrl: imgUrlRef.current.value
        }
        http.post("/changeUserImg", image).then(res => {
            if (res.success) {
                setUser(res.user)
            }
        })
    }

    return (
        <div>
            <div className="d-flex j-center a-center margin10">
                <img style={{width: "50px",
                    margin: "5px", borderRadius: "50%"}} src={user?.userImage} alt=""/>
                <input style={{height: "30px" }} ref={imgUrlRef} type="text" placeholder="Change User Image Url"/>
                <button onClick={changeUserImg}>Upload</button>
            </div>
           <div className="d-flex j-center">
               <button onClick={() => setShow(true)}>My Topics</button>
               <button onClick={() => setShow(false)}>My Comments</button>

           </div>
            {show && <MyAccountTopics/>}
            {!show && <MyAccountComments/>}
        </div>
    );
};

export default MyAccount;