import Layout from 'components/Layout'

import UserManage from 'components/SpecialRailwayLine/UserManage'

export default {
    path: '/specialRailwayLine',
    redirect: '/userManage',
    name: '专线管理',
    icon: 'icon-zhuanxian',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/userManage',
            name: '专线用户管理',
            icon: '',
            component: UserManage
        }
    ]
}
