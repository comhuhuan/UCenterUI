const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const basicDataSearchDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
		'rows|10': [{
			idcName: '内部冒烟',
			commandId:'1',
			serviceName:'5036冒烟测试机房',
			'type|0-3': 0,
			queryStartDate:'@datetime',
			queryEndDate:'@datetime',
			createTime:'@datetime',
			'excState|1-4': 1,
			excTime:'@datetime'
		}]
	}
})
let basicDataSearchDirSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
        ],
        cmdTypeList:[
        	{"value": "0", "label" :"查询基础数据"},
            {"value": "1", "label" :"打开监测"},
            {"value": "2", "label" :"关闭监测"},
            {"value": "3", "label" :"查询监测数据"},
        ],
        excStateList:[
            {"value": "1", "label" :"等待处理"},
            {"value": "2", "label" :"正在处理"},
            {"value": "3", "label" :"处理成功"},
            {"value": "4", "label" :"处理失败"},            
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/command/baseDataCmd/pagingList.do`, (req, res) => {
	  		res.send(basicDataSearchDirList)
		})
		app.post(`${baseURL}/recvCommand/baseDataCmd/init.do`, (req, res) => {
	  		res.send(basicDataSearchDirSelect)
		})
	},
]