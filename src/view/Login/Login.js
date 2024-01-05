import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { reqLogin } from "../../api/repository/login";

// global const
const REMEMBER_ID = "rememberId";

const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

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
        const rememberId = localStorage.getItem(REMEMBER_ID);
        if (rememberId) {
            setId(rememberId);
            setRemember(true);
        }
    }, []);

    const keyDownLogin = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    const submit = async () => {
        const loginData = {
            login_id : id,
            login_pw : pw
        }

        const result = await reqLogin(loginData);
        console.log(result);

        if (result.result === "success") {
            if (remember) {
                localStorage.setItem(REMEMBER_ID, id);
            } else {
                localStorage.removeItem(REMEMBER_ID);
            }
            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            navigate('/');
        } else {
            alert("Login fail");
        }
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
                    <input onKeyDown={keyDownLogin} onChange={handlePw} type="password" placeholder="password" />
                </div>
                <div className="login_etc">
                    <div className="checkbox">
                        <input onKeyDown={keyDownLogin} onChange={handleRemember} type="checkbox" />Remember Me?
                    </div>
                    <div className="forgot_pw">
                        <a href="">Forgot Password?</a>
                    </div>
                </div>
                <div className="submit">
                    <button type="submit" onKeyDown={keyDownLogin} onClick={submit} >Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;