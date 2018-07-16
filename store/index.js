import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

//挂载Vuex
Vue.use(Vuex)

const state = {
    user: false,                       //登录状态
    currMovieInfo: {},            //当前某条数据
}

const store = () => new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})

export default store
