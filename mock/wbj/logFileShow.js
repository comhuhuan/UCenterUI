const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const logFileShowList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		houseId:'5036冒烟测试机房',
		ip:'@ip',
		commandType:'基础数据指令',
		fileName:'基础数据指令',
		fileDesc:'基础数据指令',
		filePath:'基础数据指令',
		fileRecvTime:'@datetime',
		uploadResult:'基础数据指令',
		'status|1-4': 1,
		ackDesc:'sdf'
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
		app.post(`${baseURL}/recievelog/LogFile/list.do`, (req, res) => {
	  		res.send(logFileShowList)
		})
		app.post(`${baseURL}/recievelog/LogFile/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]