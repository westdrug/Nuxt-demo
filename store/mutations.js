import {
    CURR_MOVIE_INFO
} from './mutation-type'

export default {
    //记录当前某条数据
    [CURR_MOVIE_INFO](state, info) {
        state.currMovieInfo = info
    }
}
