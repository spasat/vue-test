<template>
    <div class="container">
        <Navigation v-if="isLoggedIn"/>
        <router-view/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Navigation from './components/Navigation';

    export default {
        name: "App",
        components: {Navigation},
        computed: {
            ...mapGetters(['isLoggedIn'])
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap';
    @import '~bootstrap-vue';
    @import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
