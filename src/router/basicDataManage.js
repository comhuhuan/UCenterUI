import Layout from 'components/Layout'

import IdcOperator from 'components/BasicDataManage/IdcOperator'
import HouseManage from 'components/BasicDataManage/HouseManage'
import HouseAreaManage from 'components/BasicDataManage/HouseAreaManage'
import UserManage from 'components/BasicDataManage/UserManage'
import ApplyServerManage from 'components/BasicDataManage/ApplyServerManage'
import TakeUpRoom from 'components/BasicDataManage/TakeUpRoom'
import DutyOfficerManage from 'components/BasicDataManage/DutyOfficerManage'

export default {
    path: '/basicDataManage',
    redirect: '/idcOperator',
    name: '基础数据管理',
    icon: 'icon-jichushujuguanli',
    hidden: false,
    component: Layout,
    // component: 'components/Layout',
    children: [
        {
            path: '/idcOperator',
            name: 'IDC经营者管理',
            icon: '',
            component: IdcOperator
        }, {
            path: '/houseManage',
            name: '机房管理',
            icon: '',
            component: HouseManage
        }, {
            path: '/houseAreaManage',
            name: '机房区域管理',
            icon: '',
            component: HouseAreaManage
        }, {
            path: '/userManage',
            name: '用户管理',
            icon: '',
            component: UserManage
        }, {
            path: '/applyServerManage',
            name: '应用服务管理',
            icon: '',
            component: ApplyServerManage
        }, {
            path: '/takeUpRoom',
            name: '占用机房管理',
            icon: '',
            component: TakeUpRoom
        }, {
            path: '/dutyOfficerManage',
            name: '占用机房管理',
            icon: '',
            component: DutyOfficerManage
        }    
    ]
}
