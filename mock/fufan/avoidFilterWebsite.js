const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

// 策略管理-免过滤网站 机房/指令来源/匹配模式 列表
const noFilterWebInit = Mock.mock({
	'status': 'success',
	'message': {
		'cmdFlagList|5-10': [
			{
				'label': '@csentence',
				'value': '@integer'
			}
		],
		'matchModelList': [
			{
				'label': '模糊匹配',
				'value': '1'
			},
			{
				'label': '精确匹配',
				'value': '2'
			},			
			{
				'label': '前缀匹配',
				'value': '3'
			},			
			{
				'label': '后缀匹配',
				'value': '4'
			}
		],
		'serviceCodeList': [
			{
				'label': '@cname',
				'value': '1'
			},
			{
				'label': '@cname',
				'value': '2'
			},
			{
				'label': '@cname',
				'value': '3'
			},
			{
				'label': '@cname',
				'value': '4'
			},
			{
				'label': '@cname',
				'value': '5'
			}
			
		]
	}
})

// 策略管理-免过滤网站 列表
const noFilterWebList = Mock.mock({
	'status': 'success',
	'message': {
		'rows|5-10': [
			{
				'commandId': '@natural',
				'excstateLabel|1': ['待下发', '正在下发', '下发成功','部分下发成功','下发失败','正在取消','取消成功','部分取消成功','取消失败'],
				'expiredTime': '@datetime',
				'idcCommandId': '@natural',
				'isWu|1': [30,15,20],
				'name': '@csentence',
				'operationButton|5': [
					{
						'hidden': '@boolean',
						'title': '@ctitle',
						'type|1': [1,2,3,4,5]
					}
				],
				'operationType': '@string',
				'owner': '@cname',
				'statusLabel|1': ['待下发', '下发', '取消'],
				'timeStamp': '@datetime',
				'type|1': [1,2]
			}
		],
		'total': 100
	}
})

// 策略管理-免过滤网站 详情列表
const noFilterWebDetailList = Mock.mock({
	'status': 'success',
	'message': {
		'rows|5-10': [
			{
				'commandId': '@natural',
				'content': '@csentence',
				'excStateLabel|1': ['待下发', '正在下发', '下发成功','部分下发成功','下发失败','正在取消','取消成功','部分取消成功','取消失败'],
				'matchModel|1': ['1','2','3','4'],
				'serviceName': '@csentence',
				'type|1': [1,2]
			}
		],
		'total': 100
	}
})

// 策略管理-免过滤网站 查看EU接受情况列表
const noFilterWebEuList = Mock.mock({
	'status': 'success',
	'message': {
		'rows|5-10': [
			{
				'curTime': '@datetime',
				'eunName': '@csentence',
				'msgInfo': '@csentence',
				'resultCode|1': ['下发成功', '取消成功', '失败'],
				'serviceName': '@csentence'
			}
		],
		'total': 100
	}
})

// 策略管理-免过滤网站 删除列表
const deleteList = Mock.mock({
	'status': 'success',
	'message': 'ok',
})

// 策略管理-免过滤网站 初始化编辑主体
const editInit = Mock.mock({
	'status': 'success',
	'message': {
		'commandId': '@natural',
    'expiredTime': '@datetime',
    'idcCommandId': '@natural',
    'memo': '@csentence',
    'name': '@csentence'
	}
})


// 策略管理-免过滤网站 初始化编辑策略列表
const ruleInit = Mock.mock({
  "message": {
      "rules": {
          "rows|1-5": [
              {
                  "commandId": '@natural',
                  "content": '@csentence',
                  "matchModel|1": ['1','2','3','4']
              }
          ],
          "total": 63455,
          "totalPageCount": 51518
      },
      "serviceCodes": '1,2',
      "type|1": [1,2]
  },
  "status": "success"
})

// 策略管理-免过滤网站 新增/编辑主体
const addBody = Mock.mock({
	'status': 'success',
	'message': {
		commandId: '@natural'
	}
})

// 策略管理-免过滤网站 获取获取按钮状态
const operation = Mock.mock({
  "message": {
      "operationButton": [
          {
              "hidden": '@boolean',
              "title": '@ctitle',
              "type|1": [1,2,3,4,5]
          }
      ],
      "operationResult|1": [0,1]
  },
  "status": "success"
})


module.exports = [
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/init.do`, (req, res) => {
	  		res.send(noFilterWebInit)
		})
	},
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/pagingList.do`, (req, res) => {
	  		res.send(noFilterWebList)
		})
	},
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/pagingView.do`, (req, res) => {
	  		res.send(noFilterWebDetailList)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFIlterWeb/pagingEu.do`, (req, res) => {
	  		res.send(noFilterWebEuList)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/delete.do`, (req, res) => {
	  		res.send(deleteList)
		})
	},
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/initEdit.do`, (req, res) => {
	  		res.send(editInit)
		})
	},			
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/initRule.do`, (req, res) => {
	  		res.send(ruleInit)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/save.do`, (req, res) => {
	  		res.send(addBody)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/saveRule.do`, (req, res) => {
	  		res.send(deleteList)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/removeRule.do`, (req, res) => {
	  		res.send(deleteList)
		})
	},	   
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/send.do`, (req, res) => {
	  		res.send(deleteList)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/batchSend.do`, (req, res) => {
	  		res.send(deleteList)
		})
	},	
	app => {
		app.post(`${baseURL}/strategy/noFilterWeb/operation.do`, (req, res) => {
	  		res.send(operation)
		})
	}	
]
