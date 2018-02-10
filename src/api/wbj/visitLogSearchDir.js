'use strict'
import fetch from 'utils/fetch'

export function getVisitLogSearchDirList(data) {
    return fetch({
        url: '/commamnd/AccessLogCmd/findList.do',
        method: 'post',
        data
    })
}

//访问日志查询指令机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/commamnd/AccessLogCmd/getServiceCode.do',
        method: 'post',
        data
    })
}