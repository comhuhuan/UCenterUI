/**
 * Created by xj-xtq-sy on 2018/1/9.
 */
const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const takeUpRoomList = Mock.mock({
    state: 'success',
    'message|10-15': [{
        houseName: '5036冒烟测试机房',
        orgName: '@name',
        serviceID: '@id',
        serviceContent: '@name',
        allocateTime: '@datetime',
        'accessWay|0-1': 0 // 0 未备案 1 备案
    }]
})

module.exports = [
    app => {
        app.post(`${baseURL}/takeUpRoomList`, (req, res) => {
            res.send(takeUpRoomList)
        })
    }
]
