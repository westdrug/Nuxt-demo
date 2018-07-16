<style scoped>
    .layout-logo{
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        text-align: center;
        color: #fff;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .nav-link {
        font-size: 16px;
        color: #fff;
    }
    .nav-link.nuxt-link-exact-active {
        color: #62d7f0;
    }
</style>
<template>
    <Header :style="{position: 'fixed', width: '100%', zIndex: '9'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">NUXT</div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <nuxt-link to="/" class="nav-link">
                    <Icon type="ios-navigate"></Icon>
                    首页
                    </nuxt-link>
                </MenuItem>
                <MenuItem name="2">
                    <nuxt-link to="/list" class="nav-link">
                    <Icon type="ios-keypad"></Icon>
                    列表
                    </nuxt-link>
                </MenuItem>
                <MenuItem name="3">
                    <nuxt-link to="/my" class="nav-link">
                    <Icon type="ios-analytics"></Icon>
                    我的
                    </nuxt-link>
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>
<script>
    export default {
    	data() {
    		return {

            }
        },
        components: {
        }
    }
</script>

