import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import qs from 'qs'
import storage from 'utils/storage'


// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: '/act-idc-web', // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'Content-Type': 'application/json; charset=utf-8',
    }
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    // if(config.headers)
    return config
}, error => {
    Message.error({
        showClose: true,
        message: '加载超时',
        type: 'error'
    })
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => response.data,
    error => {
        Message.error({
            showClose: true,
            message: '加载失败',
            type: 'error'
        })
        if (error.response) {
            switch (error.response.status) {
                case 401:            /**token未授权或token授权失败，过期等等**/
                    // 401 清除token信息并跳转到登录页面
                    /*store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    });*/
                    break;
                case 404:            /**未找到页面**/
                  // 404 跳转到404页面
                  // storage.get('routes')
                    /*router.push({
                        path: '/404'
                    });*/
                    router.replace({
                        path: '/404'
                    });
                    // console.log(router.options.routes)
                    break;
                case 500:            /**服务端报错**/
                    router.replace({
                        path: '/500'
                    });
                    /*router.push({
                        path: '/500'
                    });*/
                    break;
            }
        }
        return Promise.reject(error)
    }
)

export default service
