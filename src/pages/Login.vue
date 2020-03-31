<template>
    <div id="login" class="row d-flex justify-content-center">
        <div class="col-md-5 pt-5">
            <div class="card shadow">
                <div class="card-body">
                    <form @submit.prevent="onSubmit()" class="form">
                        <h3 class="text-center">Login</h3>
                        <div class="form-group">
                            <p class="text-danger" :class="{'text-danger': loginError}" v-if="loginError">
                                {{loginError.message}}
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="username">Email</label>
                            <input id='username' type="text" class="form-control"
                                   v-model="username"
                                   :class="{'is-invalid': loginError}"
                                   placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id='password' type="password" class="form-control"
                                   v-model="password"
                                   :class="{'is-invalid': loginError}"
                                   placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <a href="#">Forgot password</a>
                            <br>
                            <router-link :to="{name: 'register'}" class="is-link">Register</router-link>
                        </div>

                        <div class="text-right">
                            <button type="submit"
                                    class="btn btn-primary"
                                    :disabled="this.formDisabled">
                                <i class="fas fa-sign-in-alt"></i>
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                username: null,
                password: null,
                formDisabled: false
            };
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'loginError'])
        },
        methods: {
            ...mapActions(['login']),
            onSubmit() {
                this.formDisabled = true;
                this.login({username: this.username, password: this.password})
                    .then((res) => {
                        if (res.status === 200) {
                            this.$router.push({name: 'home'})
                        }
                        this.formDisabled = false
                    });
            }
        }
    }
</script>

<style lang="scss">
</style>