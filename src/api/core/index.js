import axios from 'axios';
import { WEB_BASE_URL, API_BASE_URL, ACCESS_TOKEN } from "../../utils/constants";

const request = axios.create({
    baseUrl: WEB_BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    },
})

// request interceptor
request.interceptors.request.use(
    (config) => {
        if (config.url.includes(API_BASE_URL)) {
            config.proxy = {
                "host" : "127.0.0.1",
                "port" : "14000",
            }
        }

        if (!config.url.includes(`${API_BASE_URL}/v1/login`)) {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config
    },
    (error) => {
        // debug
        console.log(error);
        return Promise.reject(error);
    }
);

// response interceptor
request.interceptors.response.use(
    (response) => {
        console.log('test1');
        return response.data
    },
    async (error)=>{
        console.log('test2');

        if (error.response.status === 401) {
            // authorization error
            // relogin
            return 
        }

        if (error.response.status !== 401) {
            return error.response;
        }
    }
);

export default request;