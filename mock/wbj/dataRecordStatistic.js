const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const dataRecordStatisticList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcId: '测试A1.A2',
		'commandType|1-5':1,
		ip:'@ip',
		fileName:'abc',
		filePath:'c:/abc',
		fileParseTime:'@datetime',
		errorDesc:'已上报',
		'status|1-4':1,
		ackDesc:'sdfdsf'
		}]
	}
})
let getCommandTypeList={
    status: 'success',
    message:{
        commandTypeList:[
            {"value": "1", "label" :"基础数据"},
            {"value": "2", "label" :"基础数据异常监测"},
            {"value": "3", "label" :"访问日志"},
            {"value": "4", "label" :"违法信息监测记录"},
            {"value": "5", "label" :"违法信息过滤记录"}, 
            {"value": "7", "label" :"ISMS活动状态"}, 
            {"value": "8", "label" :"活跃资源监测记录"}, 
            {"value": "9", "label" :"违法违规日志"},
            {"value": "51", "label" :"基础数据（私有接口）"}, 
            {"value": "57", "label" :"ISMS节点及链路状态"}, 
            {"value": "60", "label" :"物理机房上报"},    
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/command/DataReport/list.do`, (req, res) => {
	  		res.send(dataRecordStatisticList)
		})
		app.post(`${baseURL}/commamnd/DataReport/getComnandType.do`, (req, res) => {
	  		res.send(getCommandTypeList)
		})
	},
]