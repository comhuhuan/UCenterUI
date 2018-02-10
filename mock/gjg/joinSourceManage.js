const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

const noRecordDomainList = Mock.mock({
	status: 'success',
	'message|5-10': [{
		house_name: '5036冒烟测试机房',
		domain: '@domain',
		found_time: '@datetime',
		last_time: '@datetime',
		'record_status|0-1': 0, // 0 未备案 1 备案
		record_code: '@id',

	}]
})

module.exports = [
	app => {
		app.post('/noRecordDomainList', (req, res) => {
	  		res.send(noRecordDomainList)
		})
	},
]
