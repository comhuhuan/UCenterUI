import storage from 'utils/storage'
import defaultTab from './defaultTab'

export default {
	tabs_list: [defaultTab], // 已有的tabs
	active_tab: defaultTab,  // 活动状态的菜单与tab,
	is_location: true,       // 是否从浏览器地址栏点击前进后退改变路由
	is_collapse: false       // 菜单是否展开
}