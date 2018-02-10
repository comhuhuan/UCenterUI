import Layout from 'components/Layout'

import ReceiveDocStatistic from 'components/SummaryStatistic/ReceiveDocStatistic'

export default {
    path: '/summaryStatistic',
    redirect: '/receiveDocStatistic',
    name: '汇总统计',
    icon: 'icon-huizongtongji',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/receiveDocStatistic',
            name: '接收文档统计',
            icon: '',
            component: ReceiveDocStatistic
        }
    ]
}
