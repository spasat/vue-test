<template>
    <div id="navigation" class="is-light">
        <nav class="navbar is-white" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item logo" href="/">
                    <img src="../assets/logo.png" height="28">
                </a>

                <a role="button"
                   class="navbar-burger burger"
                   :class="{'is-active': isActive }"
                   @click="toggleBurgerMenu"
                   aria-label="menu"
                   aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isActive}">
                <div class="navbar-start">
                    <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>

                    <a class="navbar-item">
                        Documentation
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-danger" @click="logout()">
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Navigation",
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            ...mapActions(['logout']),
            toggleBurgerMenu() {
                this.isActive = !this.isActive;
            }
        }
    }
</script>

<style scoped lang="scss">
    #navigation {
        border: 2px solid #f5f5f5;
    }
</style>