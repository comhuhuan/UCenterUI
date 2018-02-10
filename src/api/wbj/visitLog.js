'use strict'
import fetch from 'utils/fetch'

export function getVisitLogList(data) {
    return fetch({
        url: '/accesslog/AccessLog/findList.do',
        method: 'post',
        data
    })
}

//访问日志EU名称列表
export function getServiceCode(data) {
    return fetch({
        url: '/accesslog/AccessLog/getServiceCode.do',
        method: 'post',
        data
    })
}