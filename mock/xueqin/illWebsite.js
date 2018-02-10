const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const list = Mock.mock({
    status: 'success',
    message: {
        'rows|20-30': [{
            'cmdFlag|1':['上级指令','本地指令'],
            'commandId': '@id',
            'excstateLable|1': ['已过期','待下发','正在下发','下发(成功)','部分下发成功','下发失败','正在取消','取消(成功)','部分取消成功','取消(失败)'],
            'expiredTime': '@date',
            'idcCommandId':'@id',
            'illegalType|1':['未备案','违法网站'],
            'isWu|1': ['30', '20', '40', '50', '30', '1', '30'],
            'name': '@cname',
            'disposeButton': [
                { 'hidden|1': true, title: '@ctitle', type:5 },
                { 'hidden|1': false, title: '@ctitle', type: 6 },
                { 'hidden|1': true, title: '@ctitle', type: 7 },
                { 'hidden|1': false, title: '@ctitle', type: 8 },
            ],
            'operationButton': [
                { 'hidden|1': true, title: '@ctitle', type: 1 },
                { 'hidden|1': false, title: '@ctitle', type: 2 },
                { 'hidden|1': true, title: '@ctitle', type: 3 },
                { 'hidden|1': false, title: '@ctitle', type: 4 },
            ],
            'operationType':'',
            'owner': '@cname',
            'statusLable|1':['待下发','下发成功','取消成功'],
            'timeStamp': '@date',
            'type|1':['域名','IP'],
        }],
        total: 100,
        totalPageCount: 5
    }
})

const initObj = Mock.mock({
    status: 'success',
    message: {
        cmdFlagList: [   //指令来源列表
            {
                "label":"上级指令",
                "value":"0"
            },{
                "label":"本地指令",
                "value":"1"
            }
        ],
        illegalTypeList: [    //违法违规情况列表
            {
                "label":"域名",
                "value":"0"
            }, {
                "label":"ip",
                "value":"1"
            }
        ],
        serviceCodeList: [    //机房列表
            {
                "label":"机房一",
                "value":"0"
            }, {
                "label":"机房二",
                "value":"1"
            }, {
                "label":"机房三",
                "value":"2"
            }
        ],
        'matchModelList': [     //匹配模式
            {label: '@cname', value: '12'},
            {label: '@cname', value: '13'},
            {label: '@cname', value: '14'},
            {label: '@cname', value: '15'},
            {label: '@cname', value: '16'},
            {label: '@cname', value: '17'},
            {label: '@cname', value: '18'},
            {label: '@cname', value: '19'},
            {label: '@cname', value: '20'},
        ]
    }
})

const initEdit = Mock.mock({
    status: 'success',
    message: {
        commandId:'@id',// 违法网站指令ID number
        expiredTime:'@date',// 过期时间 string 【yyyy-MM-dd】
        idcCommandId:'@id',// 违法网站主键 number 【新增/编辑标识】
        'illegalType|0-1': 0,// 违法违规情况 string 【初始化请求违法违规列表转换】
        memo:'@csentence',// 违法网站原因 string
        name:'@cname',// 违法网站名称 string

}
})

const initRule = Mock.mock({
    status: 'success',
    message: {
        'type|1': ["域名","ip"],
        'serviceCodes|1': ['12', '13', '14', '15', '16', '17', '18', '19', '20'],
        rules: {
            'rows|10-25': [{
                commandId: '@id',
                content: '@domain',
                'matchModel|1': ['approx', 'exact', 'prefix', 'suffix'],
            }],
            total: 200
        },
    }
})

const pagingView = Mock.mock({
    status: 'success',
    message: {
        'rows|10-25': [{
            commandId:'@id'  ,// 违法网站指令ID string
            content:'@domain'  ,//  违法网站内容 string
            'excStateLabel|1': ['正在处理', '处理失败'] ,//  执行状态 string
            'matchModel|1': ['approx', 'exact', 'prefix', 'suffix'],
            serviceName:'5036冒烟测试机房'  ,//  下发范围 string
            'type|1-2':1  ,//  违法网站类型 string 【1=域名,2=IP】
        }],
        total: 100,
        totalPageCount: ''
    }
})

const pagingBlock = Mock.mock({
    status: 'success',
    message: {
        'rows|10-25': [{
            content:'@domain' ,// 操作的具体内容 string
            curtTime:'@date' ,// 操作时间 string
            localIp:'@ip' ,// 私网IP string
            localMac:'' ,// 私网MAC string
            localMachine:'' ,// 私网机器名 string
            serviceName:'5036冒烟测试机房' ,// 机房名称 string
            stopSign:'未过滤->过滤(封堵) ' ,// 过滤状态 string
            'type|1-2':1   ,// 操作类型 string
            userId:'admin' ,// 操作用户ID号 string
            userIp:'@ip' ,// 操作用户的IP地址 string
        }],
        total: 100,
        totalPageCount: ''
    }
})

const pagingEu = Mock.mock({
    status: 'success',
    message: {
        'rows|10-25': [{
            curTime: '@date',
            euName: '@cname',
            msgInfo: '@csentence',
            'resultCode|1': [1, 2],
            serviceName: '@cname',
        }],
        total: 200,
        totalPageCount: ''
    }
})

const btnStatusUpdate = Mock.mock({
    status: 'success',
    message: {
        operationButton: [
            { 'hidden|1': true, title: '@ctitle', type: 1 },
            { 'hidden|1': false, title: '@ctitle', type: 2 },
            { 'hidden|1': true, title: '@ctitle', type: 3 },
            { 'hidden|1': false, title: '@ctitle', type: 4 },
        ],
        disposeButton: [
            { 'hidden|1': true, title: '@ctitle', type: 5 },
            { 'hidden|1': false, title: '@ctitle', type: 6 },
            { 'hidden|1': true, title: '@ctitle', type: 7 },
            { 'hidden|1': false, title: '@ctitle', type: 8 },
        ],
        operationResult: 0 // 0-正在获取结果,1-获取结果完毕
    }
})

const saveData = Mock.mock({
    status: 'success',
    message: {
        commandId: '@id'
    }
})

const commonData = Mock.mock({
    status: 'success',
    message: []
})

module.exports = [
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/pagingList.do`, (req, res) => {   //列表
            res.send(list)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/init.do`, (req, res) => {    //下拉框
            res.send(initObj)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/initEdit.do`, (req, res) => {  //初始化修改主体
            res.send(initEdit)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/initRule.do`, (req, res) => {  //初始化策略列表
            res.send(initRule)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/save.do`, (req, res) => {  //新增违法主体
            res.send(saveData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/saveRule.do`, (req, res) => {
            res.send(commonData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/removeRule.do`, (req, res) => {  //删除策略列表
            res.send(commonData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/delete.do`, (req, res) => {   //删除
            res.send(commonData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/monitor.do`, (req, res) => {  //下发，取消下发
            res.send(commonData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/block.do`, (req, res) => {  //处置，取消处置
            res.send(commonData)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/pagingView.do`, (req, res) => {   //违法网站详情
            res.send(pagingView)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/pagingBlock.do`, (req, res) => {   //处置详情
            res.send(pagingBlock)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/pagingEu.do`, (req, res) => {   //EU详情
            res.send(pagingEu)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/illegalWeb/operation.do`, (req, res) => {
            res.send(btnStatusUpdate)
        })
    },
]


