import Layout from 'components/Layout'

import VisitLogSearch from 'components/VisitLog/VisitLogSearch'

export default {
    path: '/visitLog',
    redirect: '/visitLogSearch',
    name: '访问日志管理',
    icon: 'icon-fangwenrizhi', // icon-rizhi11
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/visitLogSearch',
            name: '访问日志查询',
            icon: '',
            component: VisitLogSearch
        }
    ]
}
