import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainContext from "./context/MainContext.js";
import {useEffect, useState} from "react";
import HomePage from "./pages/HomePage.js";
import UploadThemePage from "./pages/UploadThemePage.js";
import MyFavoritesPage from "./pages/MyFavoritesPage.js";
import SingleThemePage from "./pages/SingleThemePage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import Toolbar from "./components/Toolbar";
import MyAccountPage from "./pages/MyAccountPage";
import NotificationPage from "./pages/NotificationPage";
import http from "./plugins/http";

function App() {

    const [notifications, setNotifications] = useState([])
    const [user, setUser] = useState(null)
    const [getFavorites, setFavorites] = useState([])
    const [getFavoritesIds, setFavoritesIds] = useState([])

    useEffect(() => {
        if (localStorage.getItem("LoggedIn") === "true") {
            http.get("/loggedIn").then(res => {
                if (res.success) {
                    setUser(res.user)
                }
            })
        }
    }, [])

    useEffect(() => {
        const value = JSON.parse(localStorage.getItem('favorites'))
        if (value) {
            setFavoritesIds(JSON.parse(localStorage.getItem('favorites')))
        } else {
            localStorage.setItem('favorites', JSON.stringify([]));
            setFavoritesIds([])
        }
    }, [])




    return (
        <MainContext.Provider value={{user, setUser, notifications, setNotifications, getFavorites, setFavorites, getFavoritesIds, setFavoritesIds}}>
            <BrowserRouter>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/upload" element={<UploadThemePage/>}/>
                    <Route path="/favorites" element={<MyFavoritesPage/>}/>
                    <Route path="/myAccount" element={<MyAccountPage/>}/>
                    <Route path="/:theme" element={<SingleThemePage/>}/>
                    <Route path="/notifications" element={<NotificationPage/>} />
                </Routes>
            </BrowserRouter>
        </MainContext.Provider>
    );
}

export default App;
