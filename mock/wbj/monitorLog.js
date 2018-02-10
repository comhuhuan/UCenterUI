const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const monitorLogList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		serviceName:'5036冒烟测试机房',
		blockReason:'110',
		outIp:'@ip',
		outPort:'8080',
		inIp:'@ip',
		inPort:'8080',
		host:'baidu.com',
		url:'www.baidu.com',
		curTime:'@datetime'

		}]
	}
})
let getServiceCodeList={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "1", "label" :"机房1"},
            {"value": "2", "label" :"机房2"},
            {"value": "3", "label" :"机房3"},
   		]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/securitylog/MonitorLog/findDetailList.do`, (req, res) => {
	  		res.send(monitorLogList)
		})
		app.post(`${baseURL}/securitylog/MonitorLog/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]