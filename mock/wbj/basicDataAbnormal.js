const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const basicDataAbnormalList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		serviceName:'5036冒烟测试机房',
		ip:'@ip',
		domain:'www.baidu.com',
		firstfindTime:'@datetime',
		lastfindTime:'@datetime',
		'error|1':['0','1','2','3'],
		icperror:'正常',
		realUseType:'静态',
		useType:'未登记',
		regDomain:'baidu.com',
		'state|1':['0','1']
		}]
	}
})
let getServiceCodeList={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "1", "label" :"机房1"},
            {"value": "2", "label" :"机房2"},
   		]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/securitylog/BaseDataMonitor/findIpStatusList.do`, (req, res) => {
	  		res.send(basicDataAbnormalList)
		})
		app.post(`${baseURL}/securitylog/BaseDataMonitor/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]