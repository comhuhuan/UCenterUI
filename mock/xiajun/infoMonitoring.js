/**
 * Created by xj-xtq-sy on 2018/1/25.
 */
const Mock = require('mockjs')

const infoMonitorList = Mock.mock({
    state: 'success',
    message: {
        total: 143,
        totalPageCount: 15,
        'rows|10':[{
            commandId: '@id',
            'excstateLabel|1':[0,1,2,3,4,5,6],
            expiredTime:'@date',
            'groupType|1':[0,1],
            'idcCommandId':'@id',
            'isWu|1':'@boolean',
            'name':'@name',
            operationButton:[
                { hidden:true, title:'查看EU', type:1},
                { hidden:true, title:'下发', type:2},
                { hidden:true, title:'取消下发', type:3},
                { hidden:true, title:'编辑', type:4},
                { hidden:true, title:'删除', type:5}
            ],
            operationType:'1',
            owner:'@cname',
            'statusLabel|1':[0,1],
            timeStamp:'@date'
        }]
    }
})

const infoMonitorInit = Mock.mock({
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

const infoMonitorInitEdit = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorInitRule = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorSave = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorSaveRule = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorRemoveRule = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorDelete = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorSend = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorView = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorPageEU = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorBatchSend = Mock.mock({
    state: 'success',
    message: {

    }
})

const infoMonitorOperation = Mock.mock({
    state: 'success',
    message: {

    }
})

module.exports = [
    app => {
        app.post('/strategy/infoMonitor/init.do', (req, res) => {
            res.send(infoMonitorInit)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/pagingList.do', (req, res) => {
            res.send(infoMonitorList)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/initEdit.do', (req, res) => {
            res.send(infoMonitorInitEdit)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/initRule.do', (req, res) => {
            res.send(infoMonitorInitRule)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/save.do', (req, res) => {
            res.send(infoMonitorSave)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/saveRule.do', (req, res) => {
            res.send(infoMonitorSaveRule)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/removeRule.do', (req, res) => {
            res.send(infoMonitorRemoveRule)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/delete.do', (req, res) => {
            res.send(infoMonitorDelete)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/send.do', (req, res) => {
            res.send(infoMonitorSend)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/pagingView.do', (req, res) => {
            res.send(infoMonitorView)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/pagingEu.do', (req, res) => {
            res.send(infoMonitorPageEU)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/batchSend.do', (req, res) => {
            res.send(infoMonitorBatchSend)
        })
    },
    app => {
        app.post('/strategy/infoMonitor/operation.do', (req, res) => {
            res.send(infoMonitorOperation)
        })
    }
]
