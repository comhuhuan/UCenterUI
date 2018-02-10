import Mock from 'mockjs'
import mock from '../../mock/'

const baseURL = require('../../mock/baseURL').baseURL

const res = null

const req = {
	data: null,
	send(data) {
		this.data = data
	}
}

//如果服务端已存在对应的接口，不走mock数据，这里添加服务端已有的接口即可
const existUrlList = [
	// `${baseURL}/strategy/infoMonitoring/init.do`
]

// 模拟webpack.dev.conf.js 中的setup 功能
const app = {
	post: (url, mockAjax) => {
		if( existUrlList.includes( url )) return 
		mockAjax( res, req)
		// console.log(url, req.data)
		Mock.mock(url, req.data)
	}
}

mock(app)

// 将Mock拦截暴露出来
export default Mock