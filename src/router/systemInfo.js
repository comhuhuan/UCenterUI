import Layout from 'components/Layout'

import MonitorRange from 'components/SystemInfo/MonitorRange'

export default {
    path: '/SystemInfo',
    redirect: '/monitorRange',
    name: '系统信息',
    icon: 'icon-xitongxinxi20',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/monitorRange',
            name: '监控范围',
            icon: '',
            component: MonitorRange
        }
    ]
}
