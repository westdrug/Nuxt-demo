<style lang="scss" scoped>

</style>
<template>
    <div class="container">
        我的
        <p><nuxt-link to="/">Back home</nuxt-link></p>
    </div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        middleware: 'auth',  //局部路由鉴权
        transition(to, from) {
            if (!from) return 'slide-left'
            return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        }
    }
</script>
