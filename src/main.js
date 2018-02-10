// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/component.css'

import storage from 'utils/storage'

// 服务端联调时需要mock数据打开注释即可，开发时不用打开注释
// import mockData from 'utils/mockData'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueTouchRipple)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    NProgress.start() // 开启Progress
 	next()
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

const menusHandle = menus => {
	menus.forEach( menu => {
		menu.component = require(`./${menu.component}/Index`).default

		if(menu.children) {
			menu.children.forEach( subMenu => {
				subMenu.component = require(`./${subMenu.component}/Index`).default
			})
		}
	})
	return menus
}

const errors = [
	{
	    path: '/error',
	    redirect: '/404',
	    name: '错误',
	    icon: 'icon-cuowu1',
	    component: 'components/Layout',
	    hidden: true,
	    children: [
	        {
		        path: '/404',
		        name: '404',
		        icon: 'icon-cuowu',
		        hidden: true,
		        component: 'components/Error/404',
		    },
			{
		        path: '/500',
		        name: '500',
		        icon: 'icon-cuowu',
		        hidden: true,
		        component: 'components/Error/500',
		    },

	    ]
	},
]

import {getMenus} from 'api/gjg/authorization'

// Vue.filter(executingState, value => {
//     if(value === '下发(成功)' || value === '取消(成功)') {
//         return 'success'
//     } else {
//         return 'error'
//     }
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    data: {
        Hub: new Vue(), //创建事件中心
        r_user_id: 123456789,
        r_user_name: '',
        platform_url: '',
        login_url: '',
    },
    created() {
    	this.getMenus()
    	// console.log(JSON.parse(storage.get('routes')))
    },
    methods: {
		getMenus() {
			getMenus().then( res => {
				// console.log(res)
				if(res.status === 'success') {
                    const menus = res.message.menus
                    // console.log(menus)
                    this.r_user_name = res.message.username
                    this.platform_url = res.message.platform_url
                    this.login_url = res.message.login_url
                    if(menus && menus instanceof Array) {
    					const routes = menusHandle([...menus, ...errors])
    					router.options.routes = routes
    					router.addRoutes(routes, {override: true})
    					// storage.set('routes', JSON.stringify(routes))
    				}
                } else {
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    })
                }
			}).catch( err => {
				console.log(err)
			})
		}
    }
})
