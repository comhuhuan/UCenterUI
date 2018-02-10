'use strict'

import fetch from 'utils/fetch'

export function getList(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/pagingList.do',
	    method: 'post',
	    data
  	})
}

// 初始化获取下拉列表
export function getInitData(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/init.do',
	    method: 'post',
	    data
  	})
}
// 初始化编辑主体
export function getInitEdit(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/initEdit.do',
	    method: 'post',
	    data
  	})
}
// 初始化编辑策略列表
export function getInitRule(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/initRule.do',
	    method: 'post',
	    data
  	})
}
// 修改策略主体
export function save(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/save.do',
	    method: 'post',
	    data
  	})
}
// 新增策略列表
export function saveRule(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/saveRule.do',
	    method: 'post',
	    data
  	})
}

// 删除策略
export function removeRule(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/removeRule.do',
	    method: 'post',
	    data
  	})
}

// 删除过滤信息
export function del(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/delete.do',
	    method: 'post',
	    data
  	})
}

// 下发/取消下发
export function send(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/send.do',
	    method: 'post',
	    data
  	})
}

// 详情
export function getPagingView(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/pagingView.do',
	    method: 'post',
	    data
  	})
}

// EU详情
export function getPagingEu(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/pagingEu.do',
	    method: 'post',
	    data
  	})
}
// 获取按钮信息
export function getOperation(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/operation.do',
	    method: 'post',
	    data
  	})
}

// 导入
export function importDo(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/import.do',
	    method: 'post',
		/*headers: {
			'Content-Type': 'multipart/form-data'
		},*/
	    data
  	})
}

// 导出
export function exportDo(data) {
	return fetch({
	    url: '/strategy/infoMonitoring/export.do',
	    method: 'post',
		/*headers: {
			'Accept': 'application/vnd.ms-excel'
		},*/
	    data
  	})
}
