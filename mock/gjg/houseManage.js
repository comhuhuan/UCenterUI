const Mock = require('mockjs')
const baseURL = require('../baseURL').baseURL

// 机房信息
const houseList = Mock.mock({
	status: 'success',
	'message': {
		'rows|5-10': [
			{
				IDCUnitName: '@csentence',
				houseName: '@ctitle',
				houseCode: '@id',
				addr: '@county(true)',
				area: '@city',
				'houseProp|1': ['自建', '租用', '其它'],
				manager: '@cname',
				'isReport|0-1': 0,
				'noReportReson': '@csentence',
				'returnStatus|0-1': 1,
				'zip': '@zip',
				'monitorStatus|0-1': 0,
				'ipCount|200-1000': 500,
				'networkCount|100-200': 100,
				'houseId': '@id',
				'btnAuth': {
					'issue|0-1': 0,
					'modify|0-1': 0,
					'delete|0-1': 0,
					'detail|0-1': 0
				}
			}
		],
		total: 100
	}
})

// 机房区域信息
const houseAreaList = Mock.mock({
	status: 'success',
	'message': {
		'rows|5-10': [{
			area: '@county',
			contact: '@cname',
			desc: '@cparagraph',
			houseAreaCode: '@id',
			houseAreaName: '@ctitle',
			houseName: '@cname'
		}],
		total: 100,
	}
})

// 机房ip信息
const ipList = Mock.mock({
	status: 'success',
	'message': {
		'rows|5-10': [{
			startIpAddr: '@ip',
			endIpAddr: '@ip',
			unitName: '@ctitle',
			'useType|1': ['静态IP', '动态IP', '保留IP'],
			'idenType|1': ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它'],
			idenNum: '@id',
			unitSource: '@ctitle',
			unitAllot: '@ctitle',
			timeAllot: '@date',
			'isIssue|0-1': 1,
			ipId: '@id'
		}],
		total: 100,
	}
	/*message: [
		{
			useType: '静态',
			'list|5-10': [{
				beginIp: '@ip',
				endIp: '@ip',
				unitName: '@ctitle',
				'idType|1': ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它'],
				idCode: '@id',
				sourceUnit: '@ctitle',
				allotUnit: '@ctitle',
				allotUse_time: '@date',
				'isIssue|0-1': 1,
				ipId: '@id'
			}]
		}, {
			useType: '动态',
			'list|5-10': [{
				beginIp: '@ip',
				endIp: '@ip',
				unitName: '@ctitle',
				'idType|1': ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它'],
				idCode: '@id',
				sourceUnit: '@ctitle',
				allotUnit: '@ctitle',
				allotUse_time: '@date',
				'isIssue|0-1': 1,
				ipId: '@id'
			}]
		}, {
			use_type: '保留',
			'list|5-10': [{
				beginIp: '@ip',
				endIp: '@ip',
				unitName: '@ctitle',
				'idType|1': ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它'],
				idCode: '@id',
				sourceUnit: '@ctitle',
				allotUnit: '@ctitle',
				allotUse_time: '@date',
				'isIssue|0-1': 1,
				ipId: '@id'
			}]
		},
	]*/
})

const networkList = Mock.mock({
	status: 'success',
	'message': {
		'rows|5-10': [{
			networkId: '@id',
			'networkWB': '@natural(100-200)',
			'linkType|1': ['电信', '联通', '移动', '铁通', '其它'],
			'unitName': '@csentence',
			'addr': '@ip',
			'isIssue|0-1': 0,
		}],
		total: 100,
	}
})

const cabinetList = Mock.mock({
	status: 'success',
	'message': {
		'rows|5-10': [{
			'cabAssignStatus|1': [0, 1],
			'cabCode|1-100': 1,
			'cabId': '@id',
			'cabLocation|1-100': 1,
			'cabName': '@ctitle',
			'cabOccupyStatus|0-1': 0,
			'cabUseType|1': [0, 1]
		}],
		total: 100,
	}
})

const commonData = Mock.mock({
	status: 'success',
	message: []
})

module.exports = [
	app => {
		app.post(`${baseURL}/baseData/houseManage/PageList.do`, (req, res) => {
	  		res.send(houseList)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseAreaManage/PageList.do`, (req, res) => {
	  		res.send(houseAreaList)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseManage/remove.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseManage/save.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseAreaManage/remove.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseAreaManage/save.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/ipManage/PageList.do`, (req, res) => {
	  		res.send(ipList)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/ipManage/save.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/ipManage/remove.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/networkManage/PageList.do`, (req, res) => {
	  		res.send(networkList)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/networkManage/save.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/networkManage/remove.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/cabinetManage/PageList.do`, (req, res) => {
	  		res.send(cabinetList)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/cabinetManage/save.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/cabinetManage/remove.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseManage/import.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseAreaManage/import.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/ipManage/import.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/networkManage/import.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseManage/export.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/houseAreaManage/export.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/ipManage/export.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
	app => {
		app.post(`${baseURL}/baseData/networkManage/export.do`, (req, res) => {
	  		res.send(commonData)
		})
	},
]
