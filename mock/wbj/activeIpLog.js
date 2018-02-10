const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const activeIpLogList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		ip:'@ip',
		serviceCode:'5036冒烟测试机房',
		port:'8080',
		'protocol|1': ['1','2'],
		firstTime:'@datetime',
		lastTime:'@datetime',
		visitCount:'8000',
		associationUser:'@name'

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
		app.post(`${baseURL}/activeLog/ActiveIpLog/findIPLogs.do`, (req, res) => {
	  		res.send(activeIpLogList)
		})
		app.post(`${baseURL}/activeLog/ActiveIpLog/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]