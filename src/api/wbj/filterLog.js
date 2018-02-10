'use strict'
import fetch from 'utils/fetch'

export function getFilterLogList(data) {
    return fetch({
        url: '/securitylog/FilterLog/findDetailList.do',
        method: 'post',
        data
    })
}
//过滤日志机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/securitylog/FilterLog/getServiceCode.do',
        method: 'post',
        data
    })
}