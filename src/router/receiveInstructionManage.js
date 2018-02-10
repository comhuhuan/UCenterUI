// import Layout from 'components/Layout'

// import ReceiveInstructionCheck from 'components/ReceiveInstructionManage/ReceiveInstructionCheck'

// export default {
//     path: '/receiveInstructionManage',
//     redirect: '/receiveInstructionCheck',
//     name: '接收指令管理',
//     icon: 'icon-zhilingguanli',
//     hidden: false,
//     component: Layout,
//     children: [
//         {
//             path: '/receiveInstructionCheck',
//             name: '接收指令校验',
//             icon: '',
//             component: ReceiveInstructionCheck
//         }
//     ]

import Layout from 'components/Layout'

import ReceiveDirCheck from 'components/ReceiveDirManage/ReceiveDirCheck'

export default {
    path: '/receiveDirManage',
    redirect: '/receiveDirCheck',
    name: '接收指令管理',
    icon: 'icon-zhilingguanli',
    hidden: false,
    component: Layout,
    children: [
        {
            path: '/receiveDirCheck',
            name: '接收指令校验',
            icon: '',
            component: ReceiveDirCheck
        }
    ]
}