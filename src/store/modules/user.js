import axios from 'axios';

const jwt_decode = require('jwt-decode')

export default {
    state: {
        // Keep token for refresh token functionality
        token: null,
        expire: null,
        user: null,
        loginError: null,
        registerErrors: null
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
        },
        registerErrors(state) {
            return state.registerErrors;
        }
    },
    mutations: {
        saveToken(state, token) {
            const decodedToken = jwt_decode(token)

            state.token = token;
            state.user = decodedToken.user;
            state.expire = decodedToken.exp;
        },
        setLoginError(state, reason) {
            state.loginError = {
                code: reason.response.code || 500,
                message: reason.response.data.message
            }
        },
        setRegisterErrors(state, reason) {
            state.registerErrors = [{
                code: reason.response.code || 500,
                message: reason.response.data.message
            }];
        },
        cleanLoginError(state) {
            state.loginError = null
        },
        cleanRegisterErrors(state) {
            state.registerErrors = null
        },
        removeToken(state) {
            state.token = null
            state.expire = null;
            state.user = null;
        }
    },
    actions: {
        login({commit}, credentials) {
            commit('cleanLoginError');
            return axios.post('/login_check', credentials)
                .then((res) => {
                    commit('saveToken', res.data.token);
                })
                .catch((reason) => {
                    commit('setLoginError', reason)
                });
        },
        logout({commit}) {
            commit('removeToken');
        },
        register({commit}, user) {
            commit('cleanRegisterErrors');
            return axios.post('/users/register', user)
                .then((res) => {
                    return res;
                })
                .catch((reason) => {
                    commit('setRegisterErrors', reason)
                });
        }
    },
}