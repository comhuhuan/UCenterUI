const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const illegalWebSiteLogList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		serviceName:'5036冒烟测试机房',
		ip:'@ip',
		domain:'baidu.com',
		port:'8080',
		'protocol|1': ['1','2'],
		'illegalType|1': ['1','2','999'],
		firstFound:'@datetime',
		lastFound:'@datetime',
		visitCount:'8000',
		'block|1': ['0','1'],
		serviceContent:'000'
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
		app.post(`${baseURL}/activeLog/IllegalWebLog/findIllegalWebLogs.do`, (req, res) => {
	  		res.send(illegalWebSiteLogList)
		})
		app.post(`${baseURL}/activeLog/IllegalWebLog/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]