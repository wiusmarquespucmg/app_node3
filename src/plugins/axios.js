import axios from 'axios';

const instance = axios.create({
    baseURL: "http://92.119.129.36/api/v1"
});

instance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }

        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

const getToken = () => {
    return localStorage.getItem('_token');
};

export default {
    install: (app) => {
        app.config.globalProperties.$axios = instance;
    }
}