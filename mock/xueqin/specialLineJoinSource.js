const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const IPCategoryList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            lastActiveTime:'@date',  // 最后活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',  //  发现时间 string yyyy-MM-dd HH:mm:ss
            domain:'@domain',  //  域名 string
            recordId:'@id',  //  备案号 string
            'recordState|0-3': 0, // 备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；未报备（#ff0000）
            serviceName:'5036冒烟测试机房',  //  机房名称 string
        }]
    }
})
let IPCategorySelect={
    status: 'success',
    message:{
        blockStateList:[
            { value:0, label: '未封堵' },
            { value:1, label: '已封堵' },
        ],
        recordStateList:[
            <!--备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）-->
            {"value": "0", "label" :"审核中"},
            {"value": "1", "label" :"未备案"},
            {"value": "2", "label" :"已备案"},
            {"value": "3", "label" :"异常"},
        ],
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
            {"value": "3", "label" :"机房4"},
        ]
    }
}

const lineIpManageList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',  // 最后活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',  //  发现时间 string yyyy-MM-dd HH:mm:ss
            ipAddress:'@ip',  //  ip地址 string
            'recordState|0-3': 0, // 备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；未报备（#ff0000）
            serviceName:'5036冒烟测试机房',  //  机房名称 string
        }]
    }
})
let lineIpManageSelect={
    status: 'success',
    message:{
        recordStateList:[
            <!--备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）-->
            {"value": "0", "label" :"审核中"},
            {"value": "1", "label" :"未备案"},
            {"value": "2", "label" :"已备案"},
            {"value": "3", "label" :"异常"},
        ],
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
            {"value": "3", "label" :"机房4"},
        ]
    }
}

const lineDomainReportList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',// 活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',// 发现时间 string yyyy-MM-dd HH:mm:ss
            'recordState|0-3': 0,// 是否备案 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；
            domain:'@domain',// 接入域名 string
            serviceName:'5036冒烟测试机房',// 所属机房 string
        }]
    }
})
let lineDomainReportSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
            {"value": "3", "label" :"机房4"},
        ]
    }
}

const lineDomainRecordList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            lastActivetime:'@date',// 活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',// 发现时间 string yyyy-MM-dd HH:mm:ss
            'recordState|0-3': 0,// 是否备案 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；
            serviceName:'5036冒烟测试机房',// 所属机房 string
            serviceCode:'@domain',// 顶级域名 string
        }]
    }
})
let lineDomainRecordSelect={
    status: 'success',
    message:{
        blockStateList:[
            { value:0, label: '未封堵' },
            { value:1, label: '已封堵' },
        ],
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
            {"value": "3", "label" :"机房4"},
        ]
    }
}

const lineWebsiteList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',// 活跃时间 string yyyy-MM-dd HH:mm:ss
            netIp:'@ip',// IP地址 string
            topDomain:'@domain',// 接入域名 string
            serviceName:'5036冒烟测试机房',// 所属机房 string
            netName:'@name',// 网站名称 string
        }]
    }
})
let lineWebsiteSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
            {"value": "3", "label" :"机房4"},
        ]
    }
}

module.exports = [
    app => {
        //IP类域名管理
        app.post(`${baseURL}/specialresource/specialIpDomian/findList.do`, (req, res) => {
            res.send(IPCategoryList)
        })
        app.post(`${baseURL}/specialresource/specialIpDomian/init.do`, (req, res) => {
            res.send(IPCategorySelect)
        })

        //专线IP管理
        app.post(`${baseURL}/specialresource/specialIp/findList.do`, (req, res) => {
            res.send(lineIpManageList)
        })
        app.post(`${baseURL}/specialresource/specialIp/init.do`, (req, res) => {
            res.send(lineIpManageSelect)
        })

        //专线域名备案管理
        app.post(`${baseURL}/specialresource/specialDomainRecord/findList.do`, (req, res) => {
            res.send(lineDomainRecordList)
        })
        app.post(`${baseURL}/specialresource/specialDomainRecord/init.do`, (req, res) => {
            res.send(lineDomainRecordSelect)
        })

        //专线域名报备管理
        app.post(`${baseURL}/specialresource/specialDomainReport/findList.do`, (req, res) => {
            res.send(lineDomainReportList)
        })
        app.post(`${baseURL}/specialresource/specialDomainReport/init.do`, (req, res) => {
            res.send(lineDomainReportSelect)
        })

        //专线网站管理
        app.post(`${baseURL}/specialresource/specialDomain/findList.do`, (req, res) => {
            res.send(lineWebsiteList)
        })
        app.post(`${baseURL}/specialresource/specialDomain/init.do`, (req, res) => {
            res.send(lineWebsiteSelect)
        })

    },
]




