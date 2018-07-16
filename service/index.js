import axios from 'axios'
import qs from 'qs'
import config from './config'

// 服务器端渲染，判断当前地址是属于路由跳转还是 axios 请求
if (process.server) {
    config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

const service = axios.create(config)

// POST请求传参序列化
service.interceptors.request.use(
    config => {
        if(config.method === 'POST') config.data = qs.stringify(config.data)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 返回结果处理
service.interceptors.response.use(
    res => {
        return res.data
    },
    error => {

        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break

                case 401:
                    error.message = '未授权，请登录'
                    break

                case 403:
                    error.message = '拒绝访问'
                    break

                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break

                case 408:
                    error.message = '请求超时'
                    break

                case 500:
                    error.message = '服务器内部错误'
                    break

                case 501:
                    error.message = '服务未实现'
                    break

                case 502:
                    error.message = '网关错误'
                    break

                case 503:
                    error.message = '服务不可用'
                    break

                case 504:
                    error.message = '网关超时'
                    break

                case 505:
                    error.message = 'HTTP版本不受支持'
                    break

                default:
            }
        }

        return Promise.reject(error)
    }
)
// 请求方法
export default {
    //GET
    get(url, params) {
        return service({
            url: url,
            method: 'GET',
            params: params
        })
    },
    //POST
    post(url, params) {
         return service({
             url: url,
             method: 'POST',
             params: params
         })
    },
    //DELETE
    delete(url, params) {
        return service({
            url: url,
            method: 'DELETE',
            params: params
        })
    }
}
