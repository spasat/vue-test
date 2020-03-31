<template>
    <div id="register" class="row d-flex justify-content-center  pt-5">
        <div class="col-md-5 card shadow">
            <div class="card-body">
                <form :class="{'was-validated': formWasValidated}" @submit.prevent="onSubmit" novalidate>
                    <h3 class="text-center">Register</h3>

                    <ul v-if="this.registerErrors">
                        <li v-for="(item, index) in this.registerErrors" :key="index" class="text-danger">
                            {{item.message}}
                        </li>
                    </ul>

                    <div class="form-group">
                        <label for="username">Email <small class="text-danger">*</small></label>
                        <input id='username' type="text"
                               class="form-control"
                               placeholder="Email"
                               :class="{'is-invalid': validationErrors.email}"
                               v-model="registerUser.email"/>
                        <p class="invalid-feedback" v-if="validationErrors.email">
                            {{errorMessages.require}}
                        </p>
                    </div>
                    <div class="form-group">
                        <label for="first_name">First Name <small class="text-danger">*</small></label>
                        <input id='first_name' type="text"
                               class="form-control"
                               :class="{'is-invalid': validationErrors.firstName}"
                               v-model="registerUser.firstName"
                               placeholder="First Name"/>
                        <p class="invalid-feedback" v-if="validationErrors.firstName">
                            {{errorMessages.require}}
                        </p>
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name <small class="text-danger">*</small></label>
                        <input id='last_name' type="text"
                               class="form-control"
                               :class="{'is-invalid': validationErrors.lastName}"
                               v-model="registerUser.lastName"
                               placeholder="Last Name"/>
                        <p class="invalid-feedback" v-if="validationErrors.lastName">
                            {{errorMessages.require}}
                        </p>
                    </div>
                    <div class="form-group">
                        <label for="password">Password <small class="text-danger">*</small></label>
                        <input id='password' type="password" class="form-control"
                               :class="{'is-invalid': validationErrors.password}"
                               v-model="registerUser.password"
                               placeholder="Password"/>
                        <p class="invalid-feedback" v-if="validationErrors.password">
                            {{errorMessages.require}}
                        </p>
                    </div>
                    <div class="form-group">
                        <label for="password_confirm">Confirm Password <small class="text-danger">*</small></label>
                        <input id='password_confirm' type="password"
                               class="form-control"
                               placeholder="Confirm Password"
                               :class="{'is-invalid': validationErrors.passwordConfirmed || passwordConfirmedError}"
                               :invalid="true"
                               v-model="registerUser.passwordConfirmed"
                        />
                        <p class="invalid-feedback">
                            <span v-if="validationErrors.passwordConfirmed">
                                {{errorMessages.require}}
                            </span>
                            <span v-if="passwordConfirmedError">
                                {{errorMessages.passwordConfirm}}
                            </span>
                        </p>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 text-left">
                            <router-link :to="{name: 'login'}" class="btn btn-link">
                                <i class="fas fa-sign-in-alt"></i>
                                Log In
                            </router-link>
                        </div>
                        <div class="col-md-6 text-right">
                            <button type="submit" class="btn btn-primary" :disabled="isFormDisabled">
                                <i class="fas fa-check-circle"></i>
                                Register
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
        name: "Register",
        data() {
            return {
                isFormDisabled: false,
                formWasValidated: false,
                registerUser: {
                    email: null,
                    firstName: null,
                    lastName: null,
                    password: null,
                    passwordConfirmed: null
                },
                validationErrors: {
                    email: false,
                    firstName: false,
                    lastName: false,
                    password: false,
                    passwordConfirmed: false
                },
                passwordConfirmedError: false,
                errorMessages: {
                    require: 'This field is required!',
                    passwordConfirm: 'The password confirmation should match with password!'
                }
            }
        },
        computed: {
            ...mapGetters(['registerErrors']),
            isFormValid() {
                return !Object.keys(this.validationErrors).some(key => this.validationErrors[key]) &&
                    !this.passwordConfirmedError
            }
        },
        methods: {
            ...mapActions(['register']),
            validatePasswordConfirmation() {
                this.passwordConfirmedError = this.registerUser.password !== this.registerUser.passwordConfirmed;
            },
            onSubmit(e) {
                e.preventDefault();
                this.validateForm()
                if (this.isFormValid) {
                    this.isFormDisabled = true;
                    this.register(this.registerUser)
                        .then((res) => {
                            if (res.status === 201) {
                                this.$router.push({name: 'login'});
                            }
                            this.isFormDisabled = false;
                            this.formWasValidated = false;
                        });
                }
            },
            validateForm() {
                this.formWasValidated = false;
                Object
                    .keys(this.registerUser)
                    .forEach(item => {
                        return this.validationErrors[item] = this.registerUser[item] === null
                            || this.registerUser[item] === '';
                    });
                this.validatePasswordConfirmation();
                this.formWasValidated = true;
            }
        }
    }
</script>

<style lang="scss">
    .form-control.is-invalid {
        border-color: #dc3545 !important;
        background-image: none !important;
    }
</style>