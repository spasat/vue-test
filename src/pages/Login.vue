<template>
    <div id="login" class="section">
        <div class="columns is-centered">
            <div class="column is-one-third has-background-white-ter has-round-border has-shadow">
                <form @submit.prevent="onSubmit()">
                    <h3 class="title is-3 has-text-centered">Login</h3>
                    <div class="field">
                        <p class="help" :class="{'is-danger': loginError}" v-if="loginError">
                            {{loginError.message}}
                        </p>
                    </div>
                    <div class="field">
                        <label for="username" class="label">
                            Email
                        </label>
                        <div class="control">
                            <input id='username' type="text" class="input"
                                   :class="{'is-danger': loginError}"
                                   v-model="username"
                                   placeholder="Email"/>
                        </div>
                    </div>
                    <div class="field">
                        <label for="password" class="label">
                            Password
                        </label>
                        <div class="control">
                            <input id='password' type="password" class="input"
                                   :class="{'is-danger': loginError}"
                                   v-model="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <a href="">Forgot password!</a>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <router-link :to="{name: 'register'}" class="is-link">Register</router-link>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-text-right">
                            <button type="submit" class="button is-primary" :disabled="this.formDisabled">
                                <span class="icon">
                                    <i class="fas fa-sign-in-alt"></i>
                                </span>
                                <span>
                                    Login
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
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
                username: '',
                password: '',
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
                    .then(() => this.formDisabled = false);
            }
        }
    }
</script>

<style lang="scss">
    .has {
        &-round-border {
            border-radius: 4px;
        }

        &-shadow {
            box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, .12);
        }
    }
</style>