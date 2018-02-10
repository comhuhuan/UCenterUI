import Layout from 'components/Layout'

import MonitorLogFile from 'components/ReceiveLogManage/MonitorLogFile'

export default {
    path: '/receiveLogManage',
    redirect: '/monitorLogFile',
    name: '日志接收管理',
    icon: 'icon-rizhiguanli1', // icon-rizhiguanli2
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/monitorLogFile',
            name: '监测日志文件',
            icon: '',
            component: MonitorLogFile
        }
    ]
}
