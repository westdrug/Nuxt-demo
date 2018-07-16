<style scoped>
    .v-item {
        border-bottom: 1px dotted #ddd;
        clear: both;
        overflow: hidden;
    }
    .v-attr__wrap>h6,
    .movie-crew {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: normal;
    }
    .v-attr__wrap>h6>a {font-size: 12px;}
    .v-attr__wrap>h6>a:hover {
        color: #FFFFFF;
        text-decoration: none;
        background: #37a;
    }
    .movie-crew>span {
        font-size: 12px;
        color: #505050;
        margin-right: 5px;
    }
    .movie-rating {
        height: 30px;
        line-height: 30px;
        width: 100%;
        margin-top: 15px;
    }
    .movie-rating * {
        vertical-align: middle;
    }
    .rating_num {
        color: #e09015;
        font-size: 16px;
        padding: 0 3px;
        vertical-align: -5px;
    }
</style>

<template>
    <div class="container row col">
        <h1 class="col">{{vList.title}}</h1>
        <Row>
            <Col span="12" v-for="item in vList.subjects" :key="item.id">
                <div class="v-item col row">
                    <div class="gutter">
                        <Col span="6">
                            <aside @click="depositMovieInfo(item.id)">
                                <nuxt-link :to="'/detail/'+item.id">
                                    <img :src="item.images.medium" height="130" :alt="item.title">
                                </nuxt-link>
                            </aside>
                        </Col>
                        <Col span="18">
                            <section class="v-attr__wrap">
                                <h6 @click="depositMovieInfo(item.id)">
                                    <nuxt-link :to="'/detail/'+item.id">{{item.title}}</nuxt-link>
                                </h6>
                                <div class="movie-crew">
                                    <span v-for="(c, index) in item.casts" :key="c.id">
                                        {{c.name}}
                                        <span v-if="index < (item.casts.length-1)">/</span>
                                    </span>
                                </div>
                                <div class="movie-crew">
                                    <span>{{item.year}} / </span>
                                    <span v-for="(g, index) in item.genres" :key="g.id">
                                        {{g}}
                                        <span v-if="index < (item.genres.length-1)">/</span>
                                    </span>
                                </div>
                                <div class="movie-rating">
                                    <Rate
                                        :title="item.rating.stars | toNumber"
                                        :value="item.rating.stars | toNumber" disabled>
                                    </Rate>
                                    <span class="rating_num">{{item.rating.average}}</span>
                                </div>
                            </section>
                        </Col>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    const getData = (store, params) => {
        const param = {
            'start': 0,
            'count': 20
        }
        return new Promise(resolve => {
        	store.dispatch('topMovie', param).then(res => {
        		resolve(res)
            })
        })
    }
    export default {
        async asyncData ({store, params}) {
            let res = await getData(store, params)
            return {
                vList: res
            }
        },
        data() {
            return {
            }
        },
        head () {
            return {
                title: this.vList.title
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            ...mapMutations([
            	'CURR_MOVIE_INFO'
            ]),
            depositMovieInfo(id) {
            	if(this.vList.subjects.length <=0 ) return
                let currMovieObj = this.vList.subjects.filter((item) => {
            		return item.id === id
                })

                this.CURR_MOVIE_INFO(currMovieObj)
            }
        },
        filters: {
            toNumber: function(val) {
                return Number(val.slice(0,1)+'.'+val.slice(1,2))
            }
        }
    }
</script>
