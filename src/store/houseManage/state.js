import AddHouse from 'components/BasicDataManage/HouseManage/AddHouse'
import AddIp from 'components/BasicDataManage/HouseManage/AddIp'
import AddNetwork from 'components/BasicDataManage/HouseManage/AddNetwork'
import AddArea from 'components/BasicDataManage/HouseManage/AddArea'
import ImportTpl from 'components/BasicDataManage/HouseManage/ImportTpl'
import ExportTpl from 'components/BasicDataManage/HouseManage/ExportTpl'

export default {
    isShowHouseEditor: false,
	// houseEditorType: 'add',  // modify, import, export
    /*houseEditorOptions: {
        type: '',  // add modify, import, export
        active: '', // house area ip cabinet newwork
        component: null
    },*/
    houseEditorMenus: [
        {
            type: 'add',
            menus: [
                {subject: 'house', component: AddHouse, text: '新增机房'},
                {subject: 'area', component: AddArea, text: '新增机房区域'},
                {subject: 'ip', component: AddIp, text: '新增IP地址段'},
                {subject: 'network', component: AddNetwork, text: '新增互联网出入口'},
            ]
        }, {
            type: 'modify',
            menus: [
                {subject: 'house', component: AddHouse, text: '修改机房信息', data: null},
                {subject: 'area', component: AddArea, text: '修改机房区域信息', data: null},
                {subject: 'ip', component: AddIp, text: '修改IP地址段信息', data: null},
                {subject: 'network', component: AddNetwork, text: '修改互联网出入口信息', data: null},
            ]
        }, {
            type: 'import',
            menus: [
                {subject: 'house', component: ImportTpl, text: '导入机房'},
                {subject: 'area', component: ImportTpl, text: '导入机房区域'},
                {subject: 'ip', component: ImportTpl, text: '导入IP地址段'},
                {subject: 'network', component: ImportTpl, text: '导入互联网出入口'},
            ]
        }, {
            type: 'export',
            menus: [
                {subject: 'house', component: ExportTpl, text: '导出机房'},
                {subject: 'area', component: ExportTpl, text: '导出机房区域'},
                {subject: 'ip', component: ExportTpl, text: '导出IP地址段'},
                {subject: 'network', component: ExportTpl, text: '导出互联网出入口'},
            ]
        }
    ],
    curHouseEditorMenu: null,
    curHouseEditorOptions: null,
    curHouseEditorType: '',
    houseList: [],
    houseFilter: {},
    houseAreaInfo: null,
    isShowHomePage: true
}
