import Vue from 'vue'
import iView from 'iview'
import zhLocale from 'iview/dist/locale/zh-CN'
import enLocale from 'iview/dist/locale/en-US'

export default ({ store: { state } }) => {
    const locale = state.locale === 'en'
        ? enLocale
        : zhLocale
    Vue.use(iView, { locale })
}

//按需引入

/*Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.component('Header', Header)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Button', Button)*/
