<style>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
    }
    .main {
        background-color: #fff;
        display: block;
        margin: 88px 20px 0;
        min-height: 500px;
    }
</style>
<template>
    <div class="layout">
        <i-header></i-header>
        <Content class="main">
            <nuxt/>
        </Content>
        <i-footer></i-footer>
    </div>
</template>
<script>
    import iHeader from '~/components/header.vue'
    import iFooter from '~/components/footer.vue'
    export default {
        data() {
            return {

            }
        },
        components: {
            iHeader,
            iFooter
        },
    }
</script>
