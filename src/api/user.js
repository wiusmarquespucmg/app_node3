

import axios from 'axios';




axios.defaults.baseURL = "http://92.119.129.36/api/v1";



export default {
    
    login(user, password) {

        //const axios = require('axios');
        let data = JSON.stringify({
            "user": user,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3002/api/v1/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        return axios.request(config);

    },

    register(user, email, password){
            
            let data = JSON.stringify({
                "user": user,
                "email": email,
                "password": password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3002/api/v1/register',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            
            return axios.request(config);
    
    },

    logout() {
        return axios.post('/logout');
    }
}