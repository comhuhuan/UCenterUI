const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const infoSaftyManageDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcCommandId: '16',
		commandId:'@id',
		'cmdType|1-3':1,
		createTime:'@datetime',
		'excState|1-4':1,
		excTime:'@datetime',
		owner:'admin',
		'visible|1-2':1
		}]
	}
})

const infoSaftyManageDirDetail = Mock.mock({
	status: 'success',
	message:{
		idcCommandId: '16',
		commandId:'2018010400006',
		commandType:'过滤指令',
		serviceName:'5036冒烟测试机房',
		subType:'URL',
		excState:'处理成功',
		excTime:'@datetime'
		
	}
})

let infoSaftyManageDirSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
        ],
        cmdTypeList:[
            {"value": "1", "label" :"监测指令"},
            {"value": "2", "label" :"过滤指令"},
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
		app.post(`${baseURL}/command/infoSecurityCmd/pagingList.do`, (req, res) => {
	  		res.send(infoSaftyManageDirList)
		})
		app.post(`${baseURL}/command/infoSecurity/viewDetail.do`, (req, res) => {
	  		res.send(infoSaftyManageDirDetail)
		})
		app.post(`${baseURL}/recvCommand/infoSecurityCmd/init.do`, (req, res) => {
	  		res.send(infoSaftyManageDirSelect)
		})
	},
]