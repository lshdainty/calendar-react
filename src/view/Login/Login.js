import { useEffect, useState } from "react";
import './login.css';
import request from "../../api/core";

const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [remember, setRemember] = useState(false);

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePw = (e) => {
        setPw(e.target.value);
    };

    const handleRemember = (e) => {
        setRemember(e.target.checked);
    };

    useEffect(() => {
        const rememberId = localStorage.getItem('rememberId');
        if (rememberId) {
            setId(rememberId);
            setRemember(true);
        }
    }, []);

    const keyDownLogin = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    const login = async () => {
        const loginData = {
            login_id : id,
            login_pw : pw
        }

        console.log(id);
        console.log(pw);
        console.log(remember);

        const test = await request({
            method : 'get',
            url : '/api/v1/healthz'
        })

        if (test == "success") {
            if (remember) {
                localStorage.setItem("rememberId",id);
            } else {
                localStorage.removeItem("rememberId");
            }
            localStorage.setItem("accessToken", test.data);
            localStorage.setItem("refreshToken", test.data);
        } else {
            Error("Login fail");
        }

        console.log('login js : ', test);
    };

    return (
        <div className="wrap">
            <div className="login">
                <h2>Log In</h2>
                <div className="login_id">
                    <h4>Id</h4>
                    <input onChange={handleId} placeholder="id" />
                </div>
                <div className="login_pw">
                    <h4>Password</h4>
                    <input onChange={handlePw} type="password" placeholder="password" />
                </div>
                <div className="login_etc">
                    <div className="checkbox">
                        <input onChange={handleRemember} type="checkbox" />Remember Me?
                    </div>
                    <div className="forgot_pw">
                        <a href="">Forgot Password?</a>
                    </div>
                </div>
                <div className="submit">
                    <button type="submit" onKeyDown={keyDownLogin} onClick={login} >Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;