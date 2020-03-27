import axios from 'axios';

const jwt_decode = require('jwt-decode')

export default {
    state: {
        token: null,
        expire: null,
        user: null,
        loginError: null
    },
    getters: {
        isLoggedIn(state) {
            if (state.token === null) {
                return false;
            }
            const expire = state.expire * 1000;
            const time = new Date().getTime();

            return time < expire;
        },
        loginError(state) {
            return state.loginError;
        }
    },
    mutations: {
        saveToken(state, token) {
            const decodedToken = jwt_decode(token)

            state.token = token;
            state.user = decodedToken.user;
            state.expire = decodedToken.exp;
            console.log('Token saved: ')
        },
        setLoginError(state, reason) {
            state.loginError = {
                code: reason.response.code || 500,
                message: reason.response.data.message
            }
        },
        cleanLoginError(state) {
            state.loginError = null
        },
        removeToken(state) {
            state.token = null
            state.expire = null;
            state.user = null;
        }
    },
    actions: {
        checkForToken({commit}) {
            const localStorageToken = localStorage.getItem('token') || false;
            if (localStorageToken) {
                commit('saveToken', localStorageToken);
            }
        },
        login({commit}, credentials) {
            commit('cleanLoginError');
            return axios.post('/login_check', credentials)
                .then((res) => {
                    commit('saveToken', res.data.token);
                    localStorage.setItem('token', res.data.token);
                })
                .catch((reason) => {
                    commit('setLoginError', reason)
                });
        },
        logout({commit}) {
            commit('removeToken');
            localStorage.removeItem('token');
        }
    },
}