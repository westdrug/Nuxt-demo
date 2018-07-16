<style lang="scss" scoped>

</style>
<template>
    <div class="container">
        <h1>列表 page</h1>
        <nuxt-link to="/">首页</nuxt-link>
    </div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        /*transition(to, from) {
            if (!from) return 'slide-left'
            return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        }*/
    }

</script>
