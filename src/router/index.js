import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login';
import Register from '../pages/Register';
import {requireAuthGuard, alreadyAuthGuard} from './auth-gurads';
import NotFound from '../pages/NotFound';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: requireAuthGuard
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: alreadyAuthGuard
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: alreadyAuthGuard
    },
    {
        path: '/404',
        name: 'not-found',
        component: NotFound,
        beforeEnter: requireAuthGuard
    },
    {
        path: '*',
        redirect: '/404',
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
