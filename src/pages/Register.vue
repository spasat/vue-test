<!--suppress XmlInvalidId -->
<template>
    <div id="register" class="row d-flex justify-content-center  pt-5">
        <div class="col-md-8 col-xs-6 col-sm-10 card shadow">
            <div class="card-body">
                <ValidationObserver v-slot="{passes}" slim>
                    <b-form @submit.prevent="passes(onSubmit)" novalidate>
                        <h3 class="text-center">Register</h3>

                        <ul v-if="registerErrors">
                            <li v-for="(item, index) in registerErrors" :key="index" class="text-danger">
                                {{item.message}}
                            </li>
                        </ul>

                        <ValidatedInput
                                id="emal"
                                name="Email"
                                label-for="email"
                                rules="required|email"
                                placeholder="Enter your email..."
                                v-model="registerUser.email"
                        >
                            <template v-slot:label>
                                Email <small class="text-danger">*</small>
                            </template>
                        </ValidatedInput>

                        <ValidatedInput
                                id="first_name"
                                name="First Name"
                                label-for="first_name"
                                rules="required"
                                placeholder="Enter your first name...."
                                v-model="registerUser.firstName"
                        >
                            <template v-slot:label>
                                First Name <small class="text-danger">*</small>
                            </template>
                        </ValidatedInput>

                        <ValidatedInput
                                id="last_name"
                                name="Last Name"
                                label-for="first_name"
                                rules="required"
                                placeholder="Enter your last name...."
                                v-model="registerUser.lastName"
                        >
                            <template v-slot:label>
                                Last Name <small class="text-danger">*</small>
                            </template>
                        </ValidatedInput>

                        <ValidatedInput
                                id="password"
                                vid="password"
                                name="Password"
                                label-for="password"
                                rules="required|password:3"
                                placeholder="Enter your password..."
                                v-model="registerUser.password"
                                type="password"
                        >
                            <template v-slot:label>
                                Password <small class="text-danger">*</small>
                            </template>
                        </ValidatedInput>

                        <ValidatedInput
                                id="confirm_password"
                                name="Password"
                                label-for="confirm_password"
                                rules="required|confirmed:password"
                                placeholder="Confirm password..."
                                v-model="registerUser.passwordConfirmed"
                                type="password"
                        >
                            <template v-slot:label>
                                Confirm Password <small class="text-danger">*</small>
                            </template>
                        </ValidatedInput>

                        <div class="row mt-5">
                            <div class="col-6 text-left">
                                <router-link :to="{name: 'login'}" class="btn btn-link">
                                    <i class="fas fa-sign-in-alt"></i>
                                    Log In
                                </router-link>
                            </div>
                            <div class="col-6 text-right">
                                <button type="submit" class="btn btn-primary" :disabled="isFormDisabled">
                                    <i class="fas fa-check-circle"></i>
                                    Register
                                </button>
                            </div>
                        </div>
                    </b-form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {ValidationObserver, extend} from 'vee-validate';
    import {required, length, confirmed, email} from 'vee-validate/dist/rules';
    import ValidatedInput from '../components/form/ValidatedInput';
    import {BForm} from 'bootstrap-vue';

    extend('required', required);
    extend('email', email);
    extend('password', {...length, message: "Password should have at least 3 characters!"});
    extend('confirmed',
        {...confirmed, message: "Should match with password!"}
    );

    export default {
        name: "Register",
        components: {
            ValidationObserver,
            ValidatedInput,
            BForm
        },
        data() {
            return {
                isFormDisabled: false,
                registerUser: {
                    email: null,
                    firstName: null,
                    lastName: null,
                    password: null,
                    passwordConfirmed: null
                },
            }
        },
        computed: {
            ...mapGetters(['registerErrors'])
        },
        methods: {
            ...mapActions(['register']),
            onSubmit() {
                this.isFormDisabled = true;
                this.register(this.registerUser)
                    .then((res) => {
                        if (res && res.status === 201) {
                            this.$router.push({name: 'login'});
                        }
                        this.isFormDisabled = false;
                    });
            },
        }
    }
</script>

<style lang="scss">
    /*.form-control.is-invalid {*/
    /*    border-color: #dc3545 !important;*/
    /*    background-image: none !important;*/
    /*}*/
</style>