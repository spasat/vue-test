import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login';
import Register from '../pages/Register';
import store from '../store';

Vue.use(VueRouter)

const requireAuthGuard = function (from, to, next) {
    if (!store.getters.isLoggedIn) {
        next({name: 'login'});
        return;
    }
    next();
}

const alreadyAuthGuard = function (to, from, next) {
    if (store.getters.isLoggedIn) {
        next({name: 'home'});
        return;
    }

    next();
}

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
    // An example of lazzy loading
    // {
    //   path: '/login',
    //   name: 'Login',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
