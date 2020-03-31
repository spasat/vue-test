import store from '../store';

export const requireAuthGuard = function (from, to, next) {
    if (!store.getters.isLoggedIn) {
        next({name: 'login'});
        return;
    }
    next();
}

export const alreadyAuthGuard = function (to, from, next) {
    if (store.getters.isLoggedIn) {
        next({name: 'home'});
        return;
    }

    next();
}
