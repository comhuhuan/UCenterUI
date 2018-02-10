import Layout from 'components/Layout'

import infoMonitoring from 'components/StrategyManage/InfoMonitoring'


export default {
	path: '/strategyManage',
	redirect: '/infoMonitoring',
	name: '策略管理',
	icon: 'icon-iconfonticon',
	hidden: false,
	component: Layout,
	children: [
		{
			path: '/infoMonitoring',
			name: '信息监测',
			icon: '',
			component: infoMonitoring
		}
	]
}
