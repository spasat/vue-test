<template>
    <div class="container">
        <Navigation v-if="isLoggedIn"/>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Navigation from './components/Navigation';

    export default {
        name: "App",
        components: {Navigation},
        created() {
            this.checkForToken();
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            ...mapActions(['checkForToken'])
        },
        watch: {
            isLoggedIn(newValue) {
                if (newValue) {
                    this.$router.push({name: 'home'});
                } else {
                    this.$router.push({name: 'login'});
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~bulma/bulma";
</style>
