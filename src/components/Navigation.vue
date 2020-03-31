<template>
    <div id="navigation" class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle"
                    aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggle">
                <router-link :to="{name: 'home'}">
                    <img src="../assets/logo.png" height="28">
                </router-link>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{name: 'home'}">
                            Home <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="doLogout()">Log Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {BNavItemDropdown} from 'bootstrap-vue'

    export default {
        name: "Navigation",
        components: {
            BNavItemDropdown
        },
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            ...mapActions(['logout']),
            toggleBurgerMenu() {
                this.isActive = !this.isActive;
            },
            doLogout() {
                this.logout();
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped lang="scss">
</style>