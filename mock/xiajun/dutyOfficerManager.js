/**
 * Created by xj-xtq-sy on 2018/1/15.
 */
const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const dutyOfficerList = Mock.mock({
    state: 'success',
    message: {
        total: 120,
        totalPageCount: 12,
        'rows|10': [{
            id: '@id',
            email: '@email',
            'idenTypeId|1': [2,7,8,9],
            idenNum: '@id',
            mobile: /^1[385][1-9]\d{8}/,
            name: '@name',
            'tel|1': ['027-894823','021-84902344','025-4274832','027-8693313']
        }]
    }
})

const saveOper = Mock.mock({
    'state|1': ['success','error'],
    message: '数据编辑操作结束！'
})

const findIdenTypeById = Mock.mock({
    state: 'success',
    message: [
        {idenTypeId:2, idenTypeName:'身份证'},
        {idenTypeId:7, idenTypeName:'护照'},
        {idenTypeId:8, idenTypeName:'军官证'},
        {idenTypeId:9, idenTypeName:'台胞证'}
    ]
})

const removeDutyOfficer = Mock.mock({
    state: 'success',
    message: '数据删除操作完成！'
})

module.exports = [
    app => {
        app.post(`${baseURL}/baseData/liablePersonManage/PageList.do`, (req, res) => {
            res.send(dutyOfficerList)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/chargePerson/save.do`, (req, res) => {
            res.send(saveOper)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/chargePerson/findIdenTypeById.do`, (req, res) => {
            res.send(findIdenTypeById)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/chargePerson/remove.do`, (req, res) => {
            res.send(removeDutyOfficer)
        })
    }
]
