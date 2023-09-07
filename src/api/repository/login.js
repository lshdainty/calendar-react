import request from "../core";
import { API_BASE_URL } from "../../utils/constants";

export const reqLogin = (loginData) => {
    return request({
        method : "POST",
        url : `${API_BASE_URL}/v1/login`,
        data : loginData
    });
};

export const reqReLogin = () => {
    return request({
        method : "POST",
        url : `${API_BASE_URL}/v1/relogin`
    });
};

export const reqLogout = () => {
    return request({
        method : "POST",
        url : `${API_BASE_URL}/v1/logout`
    });
};

export const reqCheckLogin = () => {
    return request({
        method : "GET",
        url : `${API_BASE_URL}/v1/login/check`
    });
};