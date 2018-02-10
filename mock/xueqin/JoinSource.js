const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const getDomainList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',  // 最后活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',  //  发现时间 string yyyy-MM-dd HH:mm:ss
            domainName:'@domain',  //  域名 string
            license:'@id',  //  备案号 string
            'recordState|0-3': 0, // 备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；未报备（#ff0000）
            serviceName:'5036冒烟测试机房',  //  机房名称 string
            domainOne:'@id',   //域名id
            serviceCode:'@id'   //机房编号
}]
    }
})
const getIpAddressList = Mock.mock({
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

let getIpSelect={
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
let getDomainSelect={
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

const getIpAndDomainList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',// 活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',// 发现时间 string yyyy-MM-dd HH:mm:ss
            ipAddress:'@ip',// IP地址 string
            level:'二级',// 域名级别 string
            recordCode:'',// 备案号/许可证号 string
            'recordState|0-3': 0,// 是否备案 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；
            secondDomain:'@domain',// 接入域名 string
            serverName:'5036冒烟测试机房',// 所属机房 string
            topDomain:'@domain',// 顶级域名 string
            webName:'@name',// 网站名称 string
        }]
    }
})
let getIpAndDomainSelect={
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


const NoRecordDomainList = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5-10': [{
            activeTime:'@date',  // 最后活跃时间 string yyyy-MM-dd HH:mm:ss
            createTime:'@date',  //  发现时间 string yyyy-MM-dd HH:mm:ss
            domain:'@domain',  //  域名 string
            'recordState|0-3': 0, // 备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）；未报备（#ff0000）
            serviceName:'5036冒烟测试机房',  //  机房名称 string
            domainOne:'@id',   //域名id
            serviceCode:'@id'   //机房编号
        }]
    }
})
let NoRecordDomainSelect={
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
const NoRecordDomainDetail = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5': [{
            ipAddress:'@ip',
            netName:'@name',
            secondDomain:'@domain',
        }]
    }
})
const DomainManageDetail = Mock.mock({
    state: 'success',
    message: {
        pageIndex: '',
        pageSize: '',
        total: 100,
        totalPageCount:20,
        'rows|5': [{
            netIp:'@ip',
            topDomainIp:'@domain',
        }]
    }
})

module.exports = [
    app => {
        app.post(`${baseURL}/resource/domainManage/findList.do`, (req, res) => {
            res.send(getDomainList)
        })
        app.post(`${baseURL}/resource/domainManage/init.do`, (req, res) => {
            res.send(getDomainSelect)
        })

        app.post(`${baseURL}/resource/ipAddress/findList.do`, (req, res) => {
            res.send(getIpAddressList)
        })
        app.post(`${baseURL}/resource/ipAddress/init.do`, (req, res) => {
            res.send(getIpSelect)
        })

        app.post(`${baseURL}/resource/ipDomain/findList.do`, (req, res) => {
            res.send(getIpAndDomainList)
        })
        app.post(`${baseURL}/resource/ipDomain/init.do`, (req, res) => {
            res.send(getIpAndDomainSelect)
        })


        app.post(`${baseURL}/resource/unRecordDomain/findList.do`, (req, res) => {
            res.send(NoRecordDomainList)
        })
        app.post(`${baseURL}/resource/unRecordDomain/init.do`, (req, res) => {
            res.send(NoRecordDomainSelect)
        })
        app.post(`${baseURL}/resource/unRecordDomain/viewDetail.do`, (req, res) => {
            res.send(NoRecordDomainDetail)
        })
        app.post(`${baseURL}/resource/domainManage/viewDetail.do`, (req, res) => {
            res.send(DomainManageDetail)
        })


    },
]




