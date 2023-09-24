

import axios from 'axios';

axios.defaults.baseURL = "http://92.119.129.36/api/v1";

export default {
    
    list() {
        
        let token = localStorage.getItem('_token');
        
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'http://localhost:3002/api/v1/clients',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
          return axios.request(config)
    },

    create(name, email, phone, cpf, cep, address){
        let token = localStorage.getItem('_token');

        let data = JSON.stringify({
            "name": name,
            "email": email,
            "phone": phone,
            "cpf": cpf,
            "cep": cep,
            "address": address
        });

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:3002/api/v1/clients',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            data : data
        }

        return axios.request(config);
    },

    show(id){
        let token = localStorage.getItem('_token');

        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: `http://localhost:3002/api/v1/clients/${id}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
          return axios.request(config)
    },
    

    update(id, name, email, phone, cpf, cep, address){
        let token = localStorage.getItem('_token');

        let data = JSON.stringify({
            "name": name,
            "email": email,
            "phone": phone,
            "cpf": cpf,
            "cep": cep,
            "address": address
        });

        let config = {
            method: 'PUT',
            maxBodyLength: Infinity,
            url: `http://localhost:3002/api/v1/clients/${id}`,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            data : data
        }

        return axios.request(config);
    },

    delete(id){
        let token = localStorage.getItem('_token');

        let config = {
            method: 'DELETE',
            maxBodyLength: Infinity,
            url: `http://localhost:3002/api/v1/clients/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.request(config);

    },

}