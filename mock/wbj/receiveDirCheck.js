const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const receiveDirCheckList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		commandSequence: '89757',
		idcId:'测试A1.A2',
		curTime:'@datetime',
		'commandType|0-6':1,
		commandId:'123456',
		'resultMsg|1':['操作成功','正在处理','xx错误'],
		commandVersion:'v2.0',
		command:'aaa',
		compressionFormat:'Zip压缩',
		encryptAlgorithm:'AES加密',
		hashAlgorithm:'MD5',
		resultCode:'失败'
		}]
	}
})
let receiveDirCheckSelect={
    status: 'success',
    message:{
        cmdVerifyList:[
            {"value": "0", "label" :"正确"},
            {"value": "1", "label" :"出错"},
        ],
        cmdTypeList:[
            {"value": "0", "label" :"基础数据管理指令"},
            {"value": "1", "label" :"访问日志查询指令"},
            {"value": "2", "label" :"信息安全管理指令"},
            {"value": "3", "label" :"管理指令查询指令"},
            {"value": "4", "label" :"代码表发布指令"},
            {"value": "5", "label" :"基础数据查询指令"},
            {"value": "6", "label" :"信息安全查询指令"},
            {"value": "51", "label" :"区域管控指令"},
            {"value": "52", "label" :"指令执行过程查询指令"},
            {"value": "53", "label" :"工单接口指令"},
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/command/receiveCmdVerify/pagingList.do`, (req, res) => {
	  		res.send(receiveDirCheckList)
		})
		app.post(`${baseURL}/recvCommand/cmdVerify/init.do`, (req, res) => {
	  		res.send(receiveDirCheckSelect)
		})
	},
]