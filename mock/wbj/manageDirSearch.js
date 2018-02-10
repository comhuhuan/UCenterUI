const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const manageDirSearchList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcID: '测试A1.A2.B3',
		serviceCode:'2018010400006',
		commandID:'12',
		timeStamp:'@datetime',
		'excState|1-4':1,
		excTime:'@datetime'
		}]
	}
})

module.exports = [ 
	app => {
		app.post(`${baseURL}/commamnd/ManageQueryCmd/findList.do`, (req, res) => {
	  		res.send(manageDirSearchList)
		})
	},
]