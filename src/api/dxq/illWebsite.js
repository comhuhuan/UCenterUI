'use strict'

import fetch from 'utils/fetch'

export function getList(data) {
    return fetch({
        url: '/strategy/illegalWeb/pagingList.do',
        method: 'post',
        data
    })
}

// 初始化获取下拉列表
export function getInitData(data) {
    return fetch({
        url: '/strategy/illegalWeb/init.do',
        method: 'post',
        data
    })
}
// 初始化编辑主体
export function getInitEdit(data) {
    return fetch({
        url: '/strategy/illegalWeb/initEdit.do',
        method: 'post',
        data
    })
}
// 初始化编辑策略列表
export function getInitRule(data) {
    return fetch({
        url: '/strategy/illegalWeb/initRule.do',
        method: 'post',
        data
    })
}
// 新增，修改违法网站主体
export function save(data) {
    return fetch({
        url: '/strategy/illegalWeb/save.do',
        method: 'post',
        data
    })
}
// 新增策略列表
export function saveRule(data) {
    return fetch({
        url: '/strategy/illegalWeb/saveRule.do',
        method: 'post',
        data
    })
}

// 删除策略
export function removeRule(data) {
    return fetch({
        url: '/strategy/illegalWeb/removeRule.do',
        method: 'post',
        data
    })
}

// 删除违法网站
export function del(data) {
    return fetch({
        url: '/strategy/illegalWeb/delete.do',
        method: 'post',
        data
    })
}

// 下发/取消下发
export function send(data) {
    return fetch({
        url: '/strategy/illegalWeb/monitor.do',
        method: 'post',
        data
    })
}
//处置/取消处置
export function block(data) {
    return fetch({
        url: '/strategy/illegalWeb/block.do',
        method: 'post',
        data
    })
}

// 详情
export function getPagingView(data) {
    return fetch({
        url: '/strategy/illegalWeb/pagingView.do',
        method: 'post',
        data
    })
}

// EU详情
export function getPagingEu(data) {
    return fetch({
        url: '/strategy/illegalWeb/pagingEu.do',
        method: 'post',
        data
    })
}
//查看处置记录
export function getPagingBlock(data) {
    return fetch({
        url: '/strategy/illegalWeb/pagingBlock.do',
        method: 'post',
        data
    })
}

// 获取按钮信息
export function getOperation(data) {
    return fetch({
        url: '/strategy/illegalWeb/operation.do',
        method: 'post',
        data
    })
}
