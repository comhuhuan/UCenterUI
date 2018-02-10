/**
 * Created by xj-xtq-sy on 2018/1/17.
 */
const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const idcOperatorList = Mock.mock({
    state: 'success',
    message: {
        total: 110,
        totalPageCount: 11,
        'rows|10': [{
            corp: '@name',
            emerContact: '@name',
            generateTime: '@datetime',
            idcAdd: '@city',
            idcId: '@id',
            idcName: '@name',
            idcOfficer: '@name',
            idcZip: '@zip',
            'idcispNum|1-999': 0,
            'isReport|0-1': 0,
            'msg|1': ['未上报原因1','未上报原因2','未上报原因3']
        }]
    }
})

const idcOperatorDetail = Mock.mock({
    state: 'success',
    message: {
        emerEmail: '@email',
        emerIdenNum: '@id',
        'emerIdenType|1': [2,7,8,9],
        emerMobile: /^1[385][1-9]\d{8}/,
        'emerTel|1': ['027-894823','021-84902344','025-4274832','027-8693313'],
        officerEmail: '@email',
        officerIdenNum: '@id',
        'officerIdenType|1': [2,7,8,9],
        officerMobile: /^1[385][1-9]\d{8}/,
        'officerTel|1': ['027-894823','021-84902344','025-4274832','027-8693313']
    }
})

const removeIdcOperator = Mock.mock({
    state: 'success',
    message: '数据删除操作完成！'
})

const saveIdcOperator = Mock.mock({
    'state|1': ['success','error'],
    message: '数据编辑操作结束！'
})

const findUser = Mock.mock({
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

module.exports = [
    app => {
        app.post(`${baseURL}/baseData/operManage/PageList.do`, (req, res) => {
            res.send(idcOperatorList)
        })
    },
    app => {
        app.post(`${baseURL}/baseData/operManage/findDetailById.do`, (req, res) => {
            res.send(idcOperatorDetail)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/idcOperator/remove.do`, (req, res) => {
            res.send(removeIdcOperator)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/idcOperator/save.do`, (req, res) => {
            res.send(saveIdcOperator)
        })
    },
    app => {
        app.post(`${baseURL}/basedata/idcOperator/findUser.do`, (req, res) => {
            res.send(findUser)
        })
    }
]
