const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const getUserManageList = Mock.mock({
    status: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        'rows|30': [{
            userId: '@id',
            userType: 1,
            userId: '@id',
            idcId: '@id',
            name: '@increment(1000)',
            addr: '@city',
            'userType|1-2': 1,
            kindId: 0,
            officerId: '@cname',
            registerTime: '@date("yyyy-MM-dd")',
            'isReport|1-2': 1,
            msg: '',
            'returnState|1-2': 1,
            //修改
            IDCode: '@id', // 证件号码 string【 必填】
            IDNumber: '测试A1.A2.B3', // IDC / ISP许可证号 string【 必填】
            IDtype: 0, // 证件类型 string【 必填】
            postalCode: '666666', // 邮政编码 string【 必填】
            remark: '描述', // 备注 string

        }]
    }
})

const getApplyServerManageList = Mock.mock({
    status: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        'rows|5-10': [{
            userUnitId: '亚鸿世纪',
            createTime: '@date("yyyy-MM-dd")',
            'isReport|1-2': 1,
            //修改
            userId: '111',
            serviceContent: ['网络新闻,博客/个人空间'],
            regType: 1,
            regId: '@id',
            'setMode|0-4': 0,
            busType: 1,
            domain: [{}],
            serviceId: '@increment(1000)',
        }]
    }
})
const getTakeUpRoomList = Mock.mock({
    status: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        'rows': [{
            houseId: '@id',
            userUnitId: '@cname',
            bandwidth: '1000',
            cabinetId: '@increment(1000)',
            houseCode: '5036冒烟测试机房',
            serviceContent: '',
            serviceId: '',
            seviceJoinType: 0,
            resAllotTime: '@date("yyyy-MM-dd")',
            isReport: 1,

            houseArea: 1,
            serviceDesc: '描述',
            serviceStartDate: '2018-01-11',
            serviceEndDate: '2018-01-17',
            serviceIp: '12.12.12.1-12.12.12.2',
            userId: '1111',
            virtualName: '主机一',
            virtualNetAddr: '@city',
            virtualPhyAddr: '@city',
            'virtualStatus|1-3': 1,
            'virtualType|1-4': 1,
        }, {
            houseId: '@id',
            userUnitId: '@cname',
            bandwidth: '1000',
            cabinetId: '@increment(1000)',
            houseCode: '5036冒烟测试机房',
            serviceContent: '即时通信',
            serviceId: '@id',
            seviceJoinType: 1,
            resAllotTime: '@date("yyyy-MM-dd")',
            isReport: 2,

            houseArea: 1,
            serviceDesc: '描述',
            serviceStartDate: '2018-01-11',
            serviceEndDate: '2018-01-17',
            serviceIp: '192.168.5.69',
            userId: '1111',
            virtualName: '主机一',
            virtualNetAddr: '@city',
            virtualPhyAddr: '@city',
            'virtualStatus|1-3': 1,
            'virtualType|1-4': 1,
        }, ]
    }
})

const getUserList = Mock.mock({
    status: 'success',
    message: {
        'rows|10-15': [{
            idenNum: '@id', // 证件号码 string
            idenType: '身份证', // 证件类型 string
            officerName: '@cname', // 安全责任人 string
            remark: '', // 备注 string
            unitAddr: '@city', // 单位地址 string
            useId: '', // 用户Id string
            'userType|1-2': 1,
            userUnitName: '@name', // 用户单位名称 string
        }],
        total: 200,
    }
})

const UserDetail = Mock.mock({
    status: 'success',
    'message': {
        IDCode: '@id',
        IDNumber: '测试A1.A2.B3',
        IDtype: 0,
        addr: '@city',
        kindId: 0,
        name: '亚鸿世纪',
        officerId: '@cname',
        postalCode: '487011',
        registerTime: '@date("yyyy-MM-dd")',
        remark: '描述',
        userId: '@id',
        userType: 1,
        // 'userType|1-2': 1,    // 1：提供应用服务的用户   2：其它用户
    }
})

const ServerDetail = Mock.mock({
    status: 'success',
    'message': {
        userId: '111',
        serviceContent: ['网络新闻,博客/个人空间'],
        regType: 1,
        regId: '43536ert',
        setMode: 2,
        busType: 1,
        domain: [{}],
        serviceId: '',
    }
})

const RoomDetail = Mock.mock({
    status: 'success',
    'message': {
        bandwidth: 345,
        cabinetId: 2,
        houseArea: 1,
        houseCode: 1,
        houseId: '',
        serviceDesc: '描述',
        serviceStartDate: '2018-01-11',
        serviceEndDate: '2018-01-17',
        serviceIp: '12.12.12.1-12.12.12.2',
        userId: '1111',
        serviceId: 1,
        virtualName: '主机一',
        virtualNetAddr: '@city',
        virtualPhyAddr: '@city',
        'virtualStatus|1-3': 1,
        'virtualType|1-4': 1,
    }
})

const getUserManageDel = Mock.mock({
    status: 'success',
    message: '成功'
})
const getApplyServerManageDel = Mock.mock({
    status: 'success',
    message: '成功'
})
const getTakeUpRoomDel = Mock.mock({
    status: 'success',
    message: '成功'
})


const getUserManageDetail = Mock.mock({
    status: 'success',
    message: {
        IDNumber: '420921196528542562', //证件号码 string
        IDtype: '身份证', //证件类型 string
        addr: '软件园中路', //单位地址 string
        customNo: '001', // 客户编号 string
        email: '89524855@qq.com', // email地址 string
        idcId: '0001', // 用户所属经营者Id string
        kindId: '国企', // 单位属性 string
        mobile: '13647258526', // 移动电话 string
        name: '北京亚鸿', // 单位名称 string
        officerId: '李红', // 安全责任人 string
        registerTime: '@date("yyyy-MM-dd")', // 注册时间 string
        remark: '', // 备注 string
        tel: '027-4852115', // 固定电话 string
        useId: '01', // 用户Id string
        userType: '', // 用户属性 string
        zip: '255555', //邮政编码
    }
})

let comList = {
    status: 'success',
    message: [{
        "kindId": 0,
        "kindName": "军队"
    }, {
        "kindId": 1,
        "kindName": "政府机关"
    }, {
        "kindId": 2,
        "kindName": "事业单位"
    }]
}
let cardList = {
    status: 'success',
    message: [{
        "idenTypeId": 0,
        "idenTypeName": "身份证"
    }, {
        "idenTypeId": 1,
        "idenTypeName": "组织机构代码证书"
    }, {
        "idenTypeId": 2,
        "idenTypeName": "事业法人证书"
    }]
}
let idcList = {
    status: 'success',
    message: [{
        "idcNameList": "测试A1.A2.B3"
    }, {
        "idcNameList": "测试A3.A4.B5"
    }, {
        "idcNameList": "测试A6.A7.B8"
    }]
}
let baList = {
    status: 'success',
    message: [{
        "regType": 0,
        "regTypeName": "经营性网站"
    }, {
        "regType": 1,
        "regTypeName": "非经营性网站"
    }, {
        "regType": "2",
        "regTypeName": "SP"
    }, {
        "regType": 3,
        "regTypeName": "BBS"
    }, {
        "regType": 4,
        "regTypeName": "其它"
    }]
}
let modeList = {
    status: 'success',
    message: [{
        "ethernetId": 0,
        "ethernetName": "虚拟主机"
    }, {
        "ethernetId": 1,
        "ethernetName": "主机托管"
    }, {
        "ethernetId": 2,
        "ethernetName": "整机租用"
    }, {
        "ethernetId": 3,
        "ethernetName": "其它"
    }]
}
let houseList = {
    status: 'success',
    message: [{
        "houseCode": 0,
        "houseName": "机房1"
    }, {
        "houseCode": 1,
        "houseName": "机房2"
    }, {
        "houseCode": 2,
        "houseName": "机房3"
    }, {
        "houseCode": 3,
        "houseName": "机房4"
    }]
}
let houseAreaList = {
    status: 'success',
    message: [{
        "roomCode": 0,
        "roomName": "片区1"
    }, {
        "roomCode": 1,
        "roomName": "片区2"
    }]
}
let cabinetIdList = {
    status: 'success',
    message: [{
        "cabCode": 0,
        "cabName": "机柜1"
    }, {
        "cabCode": 1,
        "cabName": "机柜2"
    }]
}
let theServerList = {
    status: 'success',
    message: [{
        "content": "即时通讯(2)",
    }, {
        "content": "网上支付(6)",
    }, {
        "content": "搜索引擎(8)",
    }]
}


const saverList = Mock.mock({
    status: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        'rows|5-10': [{
            email: '@email',
            idenNum: '@id',
            idenType: '身份证',
            mobile: '13647259506',
            name: '@cname',
            tel: '027-4855226',
            userId: 0,
        }]
    }
})

module.exports = [
    app => {
        app.post(`${baseURL}/basedata/userManage/pagingList.do`, (req, res) => {
            res.send(getUserManageList)
        })
        app.post(`${baseURL}/basedata/userManage/remove.do`, (req, res) => {
            res.send(getUserManageDel)
        })
        app.post(`${baseURL}/basedata/userManage/findDetailById.do`, (req, res) => {
            res.send(getUserManageDetail)
        })
        app.post(`${baseURL}/basedata/userManage/findUnitKindById.do`, (req, res) => {
            res.send(comList)
        })
        app.post(`${baseURL}/basedata/userManage/findIdenTypeById.do`, (req, res) => {
            res.send(cardList)
        })
        app.post(`${baseURL}/baseData/userManage/findIdcOperator.do`, (req, res) => {
            res.send(idcList)
        })
        app.post(`${baseURL}/basedata/userManage/findUser.do`, (req, res) => {
            res.send(saverList)
        })


        app.post(`${baseURL}/basedata/appService/PageList.do`, (req, res) => {
            res.send(getApplyServerManageList)
        })
        app.post(`${baseURL}/basedata/appService/findWebRegType.do`, (req, res) => {
            res.send(baList)
        })
        app.post(`${baseURL}/basedata/appService/findEthernetById.do`, (req, res) => {
            res.send(modeList)
        })
        app.post(`${baseURL}/basedata/appService/remove.do`, (req, res) => {
            res.send(getApplyServerManageDel)
        })


        app.post(`${baseURL}/basedata/occupyServiceRoom/PageList.do`, (req, res) => {
            res.send(getTakeUpRoomList)
        })
        app.post(`${baseURL}/basedata/occupyServiceRoom/findServiceByUserId.do`, (req, res) => {
            res.send(theServerList)
        })

        app.post(`${baseURL}/basedata/occupyServiceRoom/findHouseById.do`, (req, res) => {
            res.send(houseList)
        })
        app.post(`${baseURL}/basedata/occupyServiceRoom/findHouseRoomById.do`, (req, res) => {
            res.send(houseAreaList)
        })
        app.post(`${baseURL}/basedata/occupyServiceRoom/findCabById.do`, (req, res) => {
            res.send(cabinetIdList)
        })

        app.post(`${baseURL}/basedata/occupyServiceRoom/remove.do`, (req, res) => {
            res.send(getTakeUpRoomDel)
        })

        app.post(`${baseURL}/base/userManage/save.do`, (req, res) => {
            res.send(UserDetail)
        })
        app.post(`${baseURL}/basedata/appService/save.do`, (req, res) => {
            res.send(ServerDetail)
        })
        app.post(`${baseURL}/basedata/occupyServiceRoom/save.do`, (req, res) => {
            res.send(RoomDetail)
        })

        app.post(`${baseURL}/basedata/appService/findUserUnitById.do`, (req, res) => {
            res.send(getUserList)
        })
    },
]