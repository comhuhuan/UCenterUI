const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const visitLogSearchDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcName: '内部冒烟',
		commandID:'1',
		serviceCode:'5036冒烟测试机房',
		startTime:'@datetime',
		endTime:'@datetime',
		srcIP:'@IP',
		url:'@url',
		timeStamp:'@datetime',
		'excState|1-5':1,
		excTime:'@datetime'
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
            {"value": "4", "label" :"机房4"},    
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/commamnd/AccessLogCmd/findList.do`, (req, res) => {
	  		res.send(visitLogSearchDirList)
		})
		app.post(`${baseURL}/commamnd/AccessLogCmd/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]