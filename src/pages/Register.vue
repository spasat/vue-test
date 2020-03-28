<template>
    <div id="register" class="section">
        <div class="columns is-centered">
            <div class="column is-one-third has-background-white-ter has-round-border has-shadow">
                <form @submit.prevent="onSubmit()">
                    <h3 class="title is-3 has-text-centered">Register</h3>
                    <div class="field">
                        <p class="help" :class="{'is-danger': registerError}" v-if="registerError">
                            {{loginError.message}}
                        </p>
                    </div>
                    <div class="field">
                        <label for="username" class="label">
                            Email
                        </label>
                        <div class="control">
                            <input id='username' type="text"
                                   class="input"
                                   v-model="register.email"
                                   placeholder="Email"/>
                        </div>
                    </div>
                    <div class="field">
                        <label for="first_name" class="label">
                            First Name
                        </label>
                        <div class="control">
                            <input id='first_name' type="text"
                                   class="input"
                                   v-model="register.first_name"
                                   placeholder="First Name"/>
                        </div>
                    </div>
                    <div class="field">
                        <label for="last_name" class="label">
                            Last Name
                        </label>
                        <div class="control">
                            <input id='last_name' type="text"
                                   class="input"
                                   v-model="register.last_name"
                                   placeholder="Last Name"/>
                        </div>
                    </div>
                    <div class="field">
                        <label for="password" class="label">
                            Password
                        </label>
                        <div class="control">
                            <input id='password' type="password" class="input"
                                   v-model="register.password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div class="field">
                        <label for="password_confirm" class="label">
                            Confirm Password
                        </label>
                        <div class="control">
                            <input id='password_confirm' type="password" class="input"
                                   v-model="register.password_confirmed"
                                   placeholder="Confirm Password"/>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control is-expanded">
                            <router-link :to="{name: 'login'}" class="button">Log In</router-link>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-primary" :disabled="this.formDisabled">
                                <span class="icon">
                                    <i class="fas fa-check-circle"></i>
                                </span>
                                <span>Register</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                formDisabled: false,
                registerError: null,
                register: {
                    email: null,
                    first_name: null,
                    last_name: null,
                    password: null,
                    password_confirmed: null
                }
            }
        }
    }
</script>

<style lang="scss">

</style>