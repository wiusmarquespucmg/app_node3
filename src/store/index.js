import { createStore } from "vuex";

import UserAPI from '@/api/user.js';

export default createStore({
    state: {
        isLogged: false,
    },
    
    mutations: {
        setLogged(state, payload) {
            state.isLogged = payload;
        },

        doLogout(state) {
            state.isLogged = false;
            localStorage.removeItem("_token");
        }
    },

    actions: {
        async doLogin({ commit }, payload) {
            return UserAPI.login(payload.email, payload.password)
            .then(response => {
                console.log(response);
                
                // save token
                localStorage.setItem("_token", response.data._token);

                // set user data
                commit("setLogged", true);

            })
            .catch(error => {
                // Handle error
                console.log(error);
            });
        },

        async doLogout({ commit }) {            
            await UserAPI.logout();
            commit("doLogout");
        },
    },
});