import Layout from 'components/Layout'

import SpecialLineUserManage from 'components/SpecialLineManage/SpecialLineUserManage'

export default {
    path: '/specialLineManage',
    redirect: '/specialLineUserManage',
    name: '专线管理',
    icon: 'icon-zhuanxian',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/specialLineUserManage',
            name: '专线用户管理',
            icon: '',
            component: SpecialLineUserManage
        }
    ]
}
