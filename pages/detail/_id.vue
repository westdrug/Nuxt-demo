<style lang="scss" scoped>
    .mr10 {margin-right: 10px;}
    .mv-info-p {
        line-height: 30px;
        margin: 0;
        span {
            color: #888;
            font-size: 12px;
        }
        span:last-child {
            color: #2D8CF0;
        }
        .c-333 {color: #333;}
    }
    .mv-desc {
        font-size: 12px;
        color: #4e4e4e;
        line-height: 180%;
        text-indent: 24px;
    }
    .star-desc {border-left: 1px solid #e2e2e2;padding-left: 10px;margin-left: 10px;min-height: 300px;}
    .star-desc big {font-size: 32px;vertical-align: middle;margin-right: 8px;}
    .celebrity__wrap>p {font-size: 12px;color: #666;}
    .celebrity-work__list {
        clear: both;
        overflow: hidden;
    }
    .celebrity-work__list>section {
        float: left;
        width: 200px;
        margin: 0 15px;
        img {
            max-width: 100%;
            height: 270px;
        }
        p {
            line-height: 30px;
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
    }
</style>
<template>
    <div class="row col">
        <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>{{currMovieInfo[0].title}}</BreadcrumbItem>
        </Breadcrumb>
        <article class="row col">
            <h3 class="col">{{currMovieInfo[0].title}}<small>（{{currMovieInfo[0].year}}）</small></h3>
            <Row :gutter="16">
                <Col span="5">
                <div>
                    <img :src="currMovieInfo[0].images.large" width="100%" :alt="currMovieInfo[0].title">
                </div>
                </Col>
                <Col span="12">
                <div>
                    <p class="mv-info-p">
                        <span>导演：</span>
                        <span v-for="item in currMovieInfo[0].directors" :key="item.id">{{item.name}}</span>
                    </p>
                    <p class="mv-info-p">
                        <span>主演：</span>
                        <span v-for="(item, index) in entity.casts" :key="item.id">
                            {{item.name}}
                            <span v-if="index < (entity.casts.length-1)"> / </span>
                        </span>
                    </p>
                    <p class="mv-info-p">
                        <span>类型：</span>
                        <span v-for="(item, index) in entity.genres" :key="item">
                            {{item}}
                            <span v-if="index < (entity.genres.length-1)"> / </span>
                        </span>
                    </p>
                    <p class="mv-info-p">
                        <span>制片国家或地区：</span>
                        <span class="c-333" v-for="(item, index) in entity.countries" :key="item">
                            {{item}}
                            <span v-if="index < (entity.countries.length-1)"> / </span>
                        </span>
                    </p>
                    <p class="mv-info-p">
                        <span>语言：</span>
                        <span class="c-333" v-for="(item, index) in entity.countries" :key="item">
                            {{item}}
                            <span v-if="index < (entity.countries.length-1)"> / </span>
                        </span>
                    </p>
                    <p class="mv-info-p">
                        <span>又名：</span>
                        <span class="c-333" v-for="(item, index) in entity.aka" :key="item">
                            {{item}}
                            <span v-if="index < (entity.aka.length-1)"> / </span>
                        </span>
                    </p>
                    <p class="mv-info-p">
                        <span>评分人数：</span>
                        <span class="c-333 mr10">
                            {{entity.ratings_count}}
                        </span>
                        <span>想看人数：</span>
                        <span class="c-333 mr10">
                            {{entity.wish_count}}
                        </span>
                        <span>看过人数：</span>
                        <span class="c-333">
                            {{entity.reviews_count}}
                        </span>
                    </p>
                </div>
                <section class="mv-desc">
                    <p>
                        {{entity.summary}}
                    </p>
                </section>
                </Col>
                <Col span="7">
                <div>
                    <div class="star-desc">
                        <h6>我们评分</h6>
                        <section>
                            <big>{{entity.rating.average}}</big>
                            <Rate
                                :title="entity.rating.stars | toNumber"
                                :value="entity.rating.stars | toNumber" disabled>
                            </Rate>
                            <span>{{entity.comments_count}}人评论</span>
                        </section>
                    </div>
                </div>
                </Col>
            </Row>
        </article>
        <section class="row-col">
            <h5>{{entity.title}}的影人其它影片</h5>
            <article class="col row">
                <Row>
                    <Col span="2">
                        <section class="celebrity__wrap">
                            <img :src="photo.avatars.medium" :alt="photo.name" width="100%">
                            <p>{{photo.name}}</p>
                        </section>
                    </Col>
                    <Col span="22">
                        <div class="celebrity-work__list">
                            <section v-if="photo.works.length > 0" v-for="item in photo.works" :key="item.subject.id">
                                <img :src="item.subject.images.small" :alt="item.subject.title">
                                <p>{{item.subject.title}}</p>
                            </section>
                            <section v-else>
                                <h6>暂无影片~~~</h6>
                            </section>
                        </div>
                    </Col>
                </Row>
            </article>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        validate ({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
        },
        async asyncData({ store, params, error }) {
            const param = {
                id: params.id
            }
            let [ res, resPho ] = await Promise.all([
                store.dispatch('movieSubject', param),                  //详情
                store.dispatch('moviePhoto', param)                     //剧照
            ]).catch(() => {
                error({ statusCode: 404, message: 'Post not found' })
            })
        	return {
                entity: res,
                photo: resPho
            }
        },
        scrollToTop: true,
    	data() {
            return{
            }
        },
        mounted() {
        	console.log('photo', this.photo)
        },
        head() {
            return {
                title: this.currMovieInfo[0].title
            }
        },
        computed: {
            ...mapState([
                'currMovieInfo'
            ])
        },
        methods: {
            ...mapMutations([
            	'CURR_MOVIE_INFO'
            ])
        },
        filters: {
            toNumber: function(val) {
                return Number(val.slice(0,1)+'.'+val.slice(1,2))
            }
        },
        destroyed() {     //实例销毁后调用
            this.CURR_MOVIE_INFO(null)
        }
    }

</script>


