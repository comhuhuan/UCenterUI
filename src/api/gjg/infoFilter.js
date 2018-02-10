'use strict'

import fetch from 'utils/fetch'

export function getList(data) {
	return fetch({
	    url: '/strategy/infoFilter/pagingList.do',
	    method: 'post',
	    data
  	})
}

// 初始化获取下拉列表
export function getInitData(data) {
	return fetch({
	    url: '/strategy/infoFilter/init.do',
	    method: 'post',
	    data
  	})
}
// 初始化编辑主体
export function getInitEdit(data) {
	return fetch({
	    url: '/strategy/infoFilter/initEdit.do',
	    method: 'post',
	    data
  	})
}
// 初始化编辑策略列表
export function getInitRule(data) {
	return fetch({
	    url: '/strategy/infoFilter/initRule.do',
	    method: 'post',
	    data
  	})
}
// 修改策略主体
export function save(data) {
	return fetch({
	    url: '/strategy/infoFilter/save.do',
	    method: 'post',
	    data
  	})
}
// 新增策略列表
export function saveRule(data) {
	return fetch({
	    url: '/strategy/infoFilter/saveRule.do',
	    method: 'post',
	    data
  	})
}

// 删除策略
export function removeRule(data) {
	return fetch({
	    url: '/strategy/infoFilter/removeRule.do',
	    method: 'post',
	    data
  	})
}

// 删除过滤信息
export function del(data) {
	return fetch({
	    url: '/strategy/infoFilter/delete.do',
	    method: 'post',
	    data
  	})
}

// 下发/取消下发
export function send(data) {
	return fetch({
	    url: '/strategy/infoFilter/send.do',
	    method: 'post',
	    data
  	})
}

// 详情
export function getPagingView(data) {
	return fetch({
	    url: '/strategy/infoFilter/pagingView.do',
	    method: 'post',
	    data
  	})
}

// EU详情
export function getPagingEu(data) {
	return fetch({
	    url: '/strategy/infoFilter/pagingEu.do',
	    method: 'post',
	    data
  	})
}

// 获取按钮信息
export function getOperation(data) {
	return fetch({
	    url: '/strategy/infoFilter/operation.do',
	    method: 'post',
	    data
  	})
}

// 导出
export function exportDo(data) {
	return fetch({
	    url: '/strategy/infoFilter/export.do',
	    method: 'post',
	    data
  	})
}

// 导入
export function importDo(data) {
	return fetch({
	    url: '/strategy/infoFilter/import.do',
	    method: 'post',
	    data
  	})
}
