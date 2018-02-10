const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const list = Mock.mock({
    status: 'success',
    message: {
        'rows|20-30': [{
            'commandId': '@id',
            'excstateLabel|1': ['已过期','待下发','正在下发','下发(成功)','部分下发成功','下发失败','正在取消','取消(成功)','部分取消成功','取消(失败)'],
            'expiredTime': '@date',
            'groupType|0-1': 1,
            'idcCommandId': '@id',
            'isWu|1': ['30', '20', '40', '50', '30', '1', '30'],
            'name': '@cname',
            'operationButton': [
                { 'hidden|1': true, title: '@ctitle', type: 1 },
                { 'hidden|1': false, title: '@ctitle', type: 2 },
                { 'hidden|1': true, title: '@ctitle', type: 3 },
                { 'hidden|1': false, title: '@ctitle', type: 4 },
                { 'hidden|1': true, title: '@ctitle', type: 5 },
            ],
            'owner': '@cname',
            'statusLabel': '@ctitle',
            'timeStamp': '@date',
            'isProcess|0-1': 1,
        }],
        total: 100,
        totalPageCount: 5
    }
})

const initObj = Mock.mock({
    status: 'success',
    message: {
        matchModelList: [
            {
                "label":"模糊匹配",
                "value":"approx"
            },{
                "label":"模糊匹配",
                "value":"exact"
            },{
                "label":"前缀匹配",
                "value":"prefix"
            },{
                "label":"后缀匹配",
                "value":"suffix"
            }
        ],
        matchRangeList: [
            {
                "label":"正文标题及正文本身",
                "value":"0"
            }, {
                "label":"附件文件题目",
                "value":"1"
            }, {
                "label":"附件正文",
                "value":"2"
            }
        ],
        'serviceCodeList': [
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
        commandId: '@id',
        expiredTime: '@time',
        'grouptype|0-1': 0,
        memo: '@csentence',
        name: '@cname',
        reason: '@csentence'
    }
})

const initRule = Mock.mock({
    status: 'success',
    message: {
        'matchRange|1': [0, 1, 2],
        rules: {
            'rows|10-25': [{
                commandId: '@id',
                domain: '@domain',
                keyWord: '@word',
                'matchModel|1': ['approx', 'exact', 'prefix', 'suffix'],
                netIp: '@ip',
                netPort: '/\d{4}/',
                protocol: '@protocol',
                sourceIp: '@ip',
                sourcePort: '/\d{4}/',
                url: '@url'
            }],
            total: 200

        },
        'serviceCodes|1': ['12', '13', '14', '15', '16', '17', '18', '19', '20']
    }
})

const pagingView = Mock.mock({
    status: 'success',
    message: {
        'rows|10-25': [{
            content: '@csentence',
            excStateLabel: '@cword',
            'matchModel|1': ['approx', 'exact', 'prefix', 'suffix'],
            'schemeId': '@id',
            serviceName: '@cname',
            subtypeName: '@cname'
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
            { 'hidden|1': true, title: '@ctitle', type: 5 },
        ],
        operationResult: 0, // 0-正在获取结果,1-获取结果完毕
        percentage: 1,
        statusLable: '下发成功',
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

const exportData = {
    status: 'success',
    message: {
        filePath: 'static/template/',
        fileName: '机房信息'
    }
}

module.exports = [
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/pagingList.do`, (req, res) => {
  	  		res.send(list)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/init.do`, (req, res) => {
  	  		res.send(initObj)
  		})
  	},
    app => {
  		app.post(`${baseURL}/strategy/infoFilter/initEdit.do`, (req, res) => {
  	  		res.send(initEdit)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/initRule.do`, (req, res) => {
  	  		res.send(initRule)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/save.do`, (req, res) => {
  	  		res.send(saveData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/saveRule.do`, (req, res) => {
  	  		res.send(commonData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/removeRule.do`, (req, res) => {
  	  		res.send(commonData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/delete.do`, (req, res) => {
  	  		res.send(commonData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/send.do`, (req, res) => {
  	  		res.send(commonData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/pagingView.do`, (req, res) => {
  	  		res.send(pagingView)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/pagingEu.do`, (req, res) => {
  	  		res.send(pagingEu)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/operation.do`, (req, res) => {
  	  		res.send(btnStatusUpdate)
  		})
  	},
    app => {
  		app.post(`${baseURL}/strategy/infoFilter/export.do`, (req, res) => {
	        res.send(exportData)
  		})
  	},
  	app => {
  		app.post(`${baseURL}/strategy/infoFilter/import.do`, (req, res) => {
  	  		res.send(commonData)
  		})
  	},
]
