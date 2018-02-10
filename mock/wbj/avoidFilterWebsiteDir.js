const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const avoidFilterWebsiteDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		commandId:'12',
		noFilterName:'192.168.1',
		noFilterType:'IP',
		createDate:'@datetime',
		'excState|1':['正在处理','处理成功','部分处理成功','处理失败']
		}]
	}
})

let avoidFilterWebsiteDirSelect={
    status: 'success',
    message:{
        serviceCodeList:[
            {"value": "0", "label" :"机房1"},
            {"value": "1", "label" :"机房2"},
            {"value": "2", "label" :"机房3"},
        ],
        noFilterTypeList:[
            {"value": "1", "label" :"域名"},
            {"value": "2", "label" :"IP"},
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
		app.post(`${baseURL}/command/noFilterWebCmd/pagingList.do`, (req, res) => {
	  		res.send(avoidFilterWebsiteDirList)
		})
		app.post(`${baseURL}/command/noFilterWebCmd/init.do`, (req, res) => {
	  		res.send(avoidFilterWebsiteDirSelect)
		})
	},
]