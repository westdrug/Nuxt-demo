const resolve = require('path').resolve

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'nuxt-item',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: 'VUE、vuex、Nuxt、服务端渲染' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,                   //提取CSS文件
        analyze: {                         //分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它。
            analyzerMode: 'disabled',      //server, static, disabled
            generateStatsFile: true
        },
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })

                // 为 客户端打包 进行扩展配置
                config.devtool = 'eval-source-map'
            }
            /**
             * vendor 打包客户端太大，尝试拆分
             */
            /*if(isClient) {
                const { vendor } = config.entry
                //定义 vendor2 指定打包的模块
                const vendor2 = [
                    'iview',
                    // ... 还可添加其它模块进去
                ]
                //移除来自vendor中的模块
                config.entry.vendor = vendor.filter(x => !vendor2.includes(x))
                config.entry.vendor2 = vendor2
                const plugin = config.plugins.find((plugin) => ~plugin.chunkNames.indexOf('vendor'))
                const old = plugin.minChunks
                plugin.minChunks = function (module, count) {
                    return old(module, count) && !(/(axios)|(vuetify)|(vee-validate)/).test(module.context)
                }
            }*/
        },
        vendor: [
            'axios'
        ],
        maxChunkSize: 200000, // 压缩打包最大限制
        /**
         * iview配置按需引入规则
         */
        /*babel: {
            "plugins": [["import", {
                "libraryName": "iview",
                "libraryDirectory": "src/components"
            }]]
        }*/
    },
    css: [
        // 项目中的 Sass 文件  指定 scss 而非 sass
        { src: '~assets/css/mixin.scss', lang: 'scss' },
        // 公共 样式
        { src:  '~/assets/css/comm.css'},
        // 项目中 路由过渡动效
        { src:  '~/assets/css/transition.css'},
        // 项目中的 iview组件库
        { src: 'iview/dist/styles/iview.css' },

    ],
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type)
            }
        }
    },
    plugins: [
        { src: '~plugins/iview.js', ssr: false }  //关闭ssr渲染
    ],
    /**
     * 在每页渲染前运行 middleware 中间件的逻辑
     */
    router: {
        extendRoutes (routes) {
            routes.push({
                name: 'custom',
                path: '*',
                component: resolve(__dirname, 'pages/404.vue')
            })
        }
    },
    /**
     * axios 配置本地代理，解决跨域问题
     */
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        proxy: true
    },
    proxy: [
        [
            '/api',
            {
                target: 'https://api.douban.com',
                pathRewrite: { '^/api': '' }
            }
        ]
    ],
    generate: {
        routes: [
            '/detail/'
        ],
        minify: {
            collapseWhitespace: false,
            minifyCSS: true,
            minifyJS: true
        }
    }
}
