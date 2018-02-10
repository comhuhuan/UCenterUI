import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    /*routes: [
		{
	        path: '/error',
	        redirect: '/404',
	        name: '错误',
	        icon: 'icon-cuowu1',
	        component: require('components/Layout/Index').default,
	        // component: require('components/Layout/Index').default,
	        hidden: true,
	        children: [
		        {
			        path: '/404',
			        name: '404',
			        icon: '',
			        hidden: true,
			        // component: require('components/Error/404/Index').default,
			        component: require('components/Error/404/Index').default,
			    },
				{
			        path: '/500',
			        name: '500',
			        icon: '',
			        hidden: true,
			        // component: require('components/Error/500/Index').default,
			        component: require('components/Error/500/Index').default,
			    },

		    ]
	    }, 
    ]*/
})



/*import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/Layout'
import Home from 'components/Home'

import basicDataManage from './basicDataManage'
import strategyManage from './strategyManage'
import receiveIndructionManage from './receiveInstructionManage'
import joinSourceManage from './joinSourceManage'
import informationSafeLog from './informationSafeLog'
import activeLog from './activeLog'
import visitLog from './visitLog'
import receiveLogManage from './receiveLogManage'
import summaryStatistic from './summaryStatistic'
import systemInfo from './systemInfo'
import specialLineManage from './specialLineManage'


Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    routes: [
	    {
	        path: '/',
	        redirect: '/home',
	        name: '首页',
	        icon: 'icon-homebig',
	        component: Layout,
	        hidden: false,
	        child_hidden: true,
	        children: [{
		        path: '/home',
		        name: '首页',
		        icon: '',
		        component: Home,
		    }]
	    }

    ].concat( basicDataManage )
	.concat( strategyManage )
	.concat( receiveIndructionManage )
	.concat( joinSourceManage )
	.concat( informationSafeLog )
	.concat( activeLog )
	.concat( visitLog )
	.concat( receiveLogManage )
	.concat( summaryStatistic )
	.concat( systemInfo )
	.concat( specialLineManage )
})
*/