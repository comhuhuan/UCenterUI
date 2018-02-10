import Layout from 'components/Layout'

import ActiveDomainLog from 'components/ActiveLog/ActiveDomainLog'

export default {
    path: '/activeLog',
    redirect: '/activeDomainLog',
    name: '活跃日志',
    icon: 'icon-jichushujuguanli',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/activeDomainLog',
            name: '活跃域名日志',
            icon: '',
            component: ActiveDomainLog
        }
    ]
}
