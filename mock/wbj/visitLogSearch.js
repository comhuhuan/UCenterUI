const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const visitLogSearchList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		serviceName:'5036冒烟测试机房',
		commadName:'test0104',
		searchtime:'@datetime',
		condition:'源IP段:不限',
		timeStamp:'@datetime',
		'state|1':['1','2','3','4','5']
		}]
	}
})


module.exports = [ 
	app => {
		app.post(`${baseURL}/accesslog/AccessLogQuery/findResult.do`, (req, res) => {
	  		res.send(visitLogSearchList)
		})
	},
]