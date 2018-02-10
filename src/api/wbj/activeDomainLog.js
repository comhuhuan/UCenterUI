'use strict'
import fetch from 'utils/fetch'

export function getActiveLogManageList(data) {
    return fetch({
        url: '/activeLog/ActiveDoaminLog/findChildDomainLogs.do',
        method: 'post',
        data
    })
}
//活跃域名日志机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/activeLog/ActiveDoaminLog/getServiceCode.do',
        method: 'post',
        data
    })
}