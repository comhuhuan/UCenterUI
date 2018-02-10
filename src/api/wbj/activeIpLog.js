'use strict'
import fetch from 'utils/fetch'

export function getActiveIpLogList(data) {
    return fetch({
        url: '/activeLog/ActiveIpLog/findIPLogs.do',
        method: 'post',
        data
    })
}
//活跃IP日志机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/activeLog/ActiveIpLog/getServiceCode.do',
        method: 'post',
        data
    })
}