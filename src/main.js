import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

axios.defaults.baseURL= 'http://test-vue.local/api/'

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
