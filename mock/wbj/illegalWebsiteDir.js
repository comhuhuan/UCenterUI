const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL
const illegalWebsiteDirList = Mock.mock({
	status: 'success',
	message:{
		total:120,
		totalPageCount:12,
	'rows|10': [{
		commandId:'20180112010005',
		nofilterblackName:'baidu',
		'type|1-2':1,
		illegaltype:'未备案',
		timeStamp:'@datetime',
		'excState|1-4':1
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
            {"value": "4", "label" :"机房4"},
            {"value": "5", "label" :"机房5"},  
        ]
    }
}

module.exports = [ 
	app => {
		app.post(`${baseURL}/commamnd/IllegalWebCmd/findList.do`, (req, res) => {
	  		res.send(illegalWebsiteDirList)
		})
		app.post(`${baseURL}/commamnd/IllegalWebCmd/getServiceCode.do`, (req, res) => {
	  		res.send(getServiceCodeList)
		})
	},
]