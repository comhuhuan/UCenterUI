const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const receiveDocStatisticList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
	

		}]
	}
})
let getCommandTypeList={
    status: 'success',
    message:{
        commandTypeList:[
            {"value": "1", "label" :"监测日志文件"},
            {"value": "2", "label" :"过滤日志文件"},
            {"value": "3", "label" :"活跃资源文件"},
            {"value": "4", "label" :"活动状态文件"},
            {"value": "5", "label" :"链路状态文件"},
            {"value": "6", "label" :"网卡状态文件"},
   		]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/statistics/RecieveFile/getChartData.do`, (req, res) => {
	  		res.send(receiveDocStatisticList)
		})
		app.post(`${baseURL}/statistics/RecieveFile/getCommandType.do`, (req, res) => {
	  		res.send(getCommandTypeList)
		})
	},
]