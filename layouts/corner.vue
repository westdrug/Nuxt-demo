<style scoped>
    .corner {
        background-color: #46484c;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
    .corner__wrap {
        position: relative;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>
<template>
    <div class="corner">
        <section class="corner__wrap">
        <nuxt/>
        </section>
    </div>
</template>
