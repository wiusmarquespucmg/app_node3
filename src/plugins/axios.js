import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
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