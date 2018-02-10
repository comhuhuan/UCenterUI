const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const activeSourceSearchDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcName: '内部冒烟',
		serviceName:'5036冒烟测试机房',
		commandId:'12354',
		'type|1-2':1,
		content:'资源',
		queryTime:'@datetime',
		timeStamp:'@datetime',
		'excState|1-4':1,
		exctime:'@datetime'
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
		app.post(`${baseURL}/commamnd/ActiveResourceCmd/findList.do`, (req, res) => {
	  		res.send(activeSourceSearchDirList)
		})
		app.post(`${baseURL}/commamnd/ActiveResourceCmd/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]