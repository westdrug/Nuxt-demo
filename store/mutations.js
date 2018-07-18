import {
    SET_LANG,
    CURR_MOVIE_INFO
} from './mutation-type'

export default {
    //设置当前语言环境
    [SET_LANG](state, locale) {
        if(state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    //记录当前某条数据
    [CURR_MOVIE_INFO](state, info) {
        state.currMovieInfo = info
    }
}
