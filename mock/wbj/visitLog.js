const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const visitLogList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		commonCode: 'EU94',
		serverName:'5036冒烟测试机房',
		serverIp:'@ip',
		url:'@url',
		proxyType:'8080',
		domain:'baidu.com',
		outIp:'@ip',
		curTime:'@datetime',
		'transType|1':['1','2'],
		howLong:'2h'
		}]
	}
})
let getServiceCodeList={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "1", "label" :"EU94"},
            {"value": "2", "label" :"EU72"},   
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/accesslog/AccessLog/findList.do`, (req, res) => {
	  		res.send(visitLogList)
		})
		app.post(`${baseURL}/accesslog/AccessLog/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]