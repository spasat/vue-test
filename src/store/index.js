import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
    reducer: (state) => ({
        user: {
            token: state.user.token,
            expire: state.user.expire,
            user: state.user.user
        }
    })
});

export default new Vuex.Store({
    modules: {
        user: User
    },
    plugins: [vuexLocalStorage.plugin]
})
