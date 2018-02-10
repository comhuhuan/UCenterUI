/**
 * Created by xj-xtq-sy on 2018/1/24.
 */
const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const activeSourceperiodList = Mock.mock({
    state: 'success',
    message: {
        total: 130,
        totalPageCount: 11,
        'rows|10': [{
            'deployMode|1': [1,2,3,4],
            provID: '@id',
            serviceCode: '@id',
            'reportTime|1': [1,2,3,4,5,6,7,8,9,10,11],
            serviceName: '@cname',
            timeStamp: '@date'
        }]
    }
})

const getJifangList = Mock.mock({
    state: 'success',
    message: {
        'serviceCodeList|5-9': [
            {
                label:'@cname',
                value:'@id'
            }
        ]
    }
})

const setActivePeriod = Mock.mock({
    state: 'success',
    message: '数据编辑操作结束！'
})

module.exports = [
    app => {
        app.post(`${baseURL}/strategy/activeResource/pagingList.do`, (req, res) => {
            res.send(activeSourceperiodList)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/activeResource/init.do`, (req, res) => {
            res.send(getJifangList)
        })
    },
    app => {
        app.post(`${baseURL}/strategy/activeResource/save.do`, (req, res) => {
            res.send(setActivePeriod)
        })
    }
]
