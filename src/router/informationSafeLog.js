import Layout from 'components/Layout'

import BasicDataAbnormal from 'components/InfoSafeLog/BasicDataAbnormal'

export default {
    path: '/infoSafeLog',
    redirect: '/basicDataAbnormal',
    name: '信安日志',
    icon: 'icon-xinxianquan1',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/basicDataAbnormal',
            name: '基础数据异常监测',
            icon: '',
            component: BasicDataAbnormal
        }
    ]
}
