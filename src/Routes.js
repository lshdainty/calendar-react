import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "./utils/constants"

import Login from "./view/Login/Login";
import Home from "./view/Home/Home";

export const Router = () => {
    const isLogin = localStorage.getItem(ACCESS_TOKEN);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogin) {
            navigate('/login');
        }
    }, []);

    return (
        <Routes>
            <Route path='/login' element={!isLogin ? <Login/> : <Navigate replace to="/"/>} />
            <Route path='/' element={ <Home/> } />
            <Route path='*' element={ <div>test</div> } />
        </Routes>
    )
}