import Layout from 'components/Layout'

import NoRecordDomain from 'components/JoinSourceManage/NoRecordDomain'
import DomainManage from 'components/JoinSourceManage/DomainManage'
import IpAddress from 'components/JoinSourceManage/IpAddress'
import IpAndDomain from 'components/JoinSourceManage/IpAndDomain'
import RecordData from 'components/JoinSourceManage/RecordData'

export default {
	path: '/joinSourceManage',
	redirect: '/noRecordDomain',
	name: '接入资源管理',
	icon: 'icon-jieruguanli',
	hidden: false,
	component: Layout,
	children: [
		{
			path: '/noRecordDomain',
			name: '未备案域名监测',
			icon: '',
			component: NoRecordDomain
		}, {
			path: '/domainManage',
			name: '域名管理',
			icon: '',
			component: DomainManage
		}, {
			path: '/ipAddress',
			name: 'IP地址管理',
			icon: '',
			component: IpAddress
		}, {
			path: '/ipAndDomain',
			name: 'IP域名关系',
			icon: '',
			component: IpAndDomain
		}, {
			path: '/recordData',
			name: '备案数据',
			icon: '',
			component: RecordData
		}
	]
}
