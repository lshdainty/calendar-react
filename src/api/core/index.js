import axios from 'axios';

const webBaseURL = '/';
const apiBaseURL = '/api';

const request = axios.create({
    baseUrl: webBaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// request interceptor
request.interceptors.request.use(
    (config) => {
        if (config.url.includes(apiBaseURL)) {
            config.proxy = {
                'host': '127.0.0.1',
                'port': '14000',
            }
        }

        if (!config.url.includes('/api/v1/login')) {
            const accessToken = localStorage.getItem('accessToken');
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
        console.log("index js : ", response);
        return response.data
    },
    async (error)=>{
        console.log('test2');
        console.log("index js : ", error);

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