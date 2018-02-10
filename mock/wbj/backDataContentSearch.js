const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const backDataContentSearchList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		idcName: '内部冒烟',
		serviceCode:'123456',
		serviceName:'5036冒烟测试机房',
		'dataType|1':['0','1','2'],
		'returnCode|0-4':1,
		returnMsg:'1',
		createTime:'@datetime',
		'excState|1-4':1,
        id: '@id',
		excTime:'@datetime'
		}]
	}
})

const backDataContentSearchDetail = Mock.mock({
    status: 'success',
    message:{
        id: '@id',
        idcName:'内部冒烟',
        dataType:'机房数据',
        serviceCode:'8456',
        serviceName:'5036冒烟测试机房',
        gatewayName:'1.1.1.1',
        ipSegName:'1.1.1',
        frameName:'01',
        custId:'111',
        custName:'亚鸿世纪',
        appServiceName:'即时通讯',
        domainName:'www.baidu.com',
        occupyServiceName:'sfsd',
        returnCode:'其他原因退回',
        returnMsg :'1',
        createTime :'@datetime',
        excState :'等待处理',
        excTime :'@datetime'
    }
})

let backDataContentSearchSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
        ],
        returnTypeList:[
            {"value": "0", "label" :"经营者"},
            {"value": "1", "label" :"机房数据"},
            {"value": "2", "label" :"用户数据"},
        ],
        returnReasonList:[
            {"value": "0", "label" :"上报记录通过核验"},
            {"value": "1", "label" :"上报数据与既有数据记录冲突"},
            {"value": "2", "label" :"上报数据内容不完整"},
            {"value": "3", "label" :"上报数据内容错误"},
        ],
        excStateList:[
            {"value": "1", "label" :"等待处理"},
            {"value": "2", "label" :"处理完成"},
            {"value": "3", "label" :"重新上报成功"},
            {"value": "4", "label" :"重新上报失败"},          
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/command/returnBackData/pagingList.do`, (req, res) => {
	  		res.send(backDataContentSearchList)
		})
        app.post(`${baseURL}/command/returnBackData/view.do`, (req, res) => {
            res.send(backDataContentSearchDetail)
        })
		app.post(`${baseURL}/recvCommand/returnBackData/init.do`, (req, res) => {
	  		res.send(backDataContentSearchSelect)
		})
	},
]