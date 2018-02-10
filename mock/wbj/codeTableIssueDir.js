const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const codeTableIssueDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		commandId:'12',
		createTime:'@datetime',
		'excState|1-4': 1,
		excTime:'@datetime'
		}]
	}
})
let codeTableIssueDirSelect={
    status: 'success',
    message:{
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
		app.post(`${baseURL}/command/codeListIssuseCmd/pagingList.do`, (req, res) => {
	  		res.send(codeTableIssueDirList)
		})
		app.post(`${baseURL}/command/codeListIssuseCmd/init.do`, (req, res) => {
            res.send(codeTableIssueDirSelect)
        })
	},
]