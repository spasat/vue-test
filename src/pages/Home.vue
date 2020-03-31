<template>
    <div id="home" class="container">
        <h1 class="title is-1 is-centered">Home</h1>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                pageTitle: "Some super puper title in here!"
            }
        },
        watch: {
            $router: {
                immediate: true,
                handler: function () {
                    document.title = this.pageTitle;
                }
            }
        }
    }
</script>
