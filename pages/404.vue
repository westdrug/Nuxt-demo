<style scoped>
    .error__wrap {
        text-align: center;
        color: #fff;
    }
</style>
<template>
    <div class="error__wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"/></svg>
        <h1 :style="{fontSize: '58px',margin: '20px 0 10px'}">404</h1>
        <h2 :style="{marginBottom: '10px'}">页面不存在</h2>
        <nuxt-link to="/">返回首页</nuxt-link>
    </div>
</template>

<script>
    export default {
        layout: 'corner',
        data() {
            return {
            	title: '404 - 页面不存在'
            }
        },
        head () {
            return {
                title: this.title,
                meta: [
                    { hid: 'description', name: 'description', content: 'Nuxt.js project' }
                ]
            }
        }
    }
</script>
