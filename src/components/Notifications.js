import {useContext, useEffect} from 'react';
import mainContext from "../context/MainContext";
import {useNavigate} from "react-router";
import http from "../plugins/http";

const Notifications = () => {


    const {notifications, setNotifications, user} = useContext(mainContext)
    const nav = useNavigate()


    useEffect(() => {
        http.get('/getNotifications').then (res=> {
            if (res.success) setNotifications(res.findNotifications)
        })
    }, [user, notifications])

    return (
        <div>
            {notifications.length > 0 ? <div><p>You have new notifications on these topics:</p>
                {notifications.map((x, i) => <div onClick={() => nav(`/${x.themeId}`)} key={i}>
                    <h4>{x.title} comment left by {x.username}</h4>
                </div>)}</div> : <p>No notifications</p>}
        </div>
    );
};

export default Notifications;