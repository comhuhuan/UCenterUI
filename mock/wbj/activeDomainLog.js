const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const activeDomainLogList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		domain:'baidu.com',
		serviceName:'5036冒烟测试机房',
		ip:'@ip',
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
		app.post(`${baseURL}/activeLog/ActiveDoaminLog/findChildDomainLogs.do`, (req, res) => {
	  		res.send(activeDomainLogList)
		})
		app.post(`${baseURL}/activeLog/ActiveDoaminLog/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]