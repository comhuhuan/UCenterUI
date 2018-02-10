'use strict'
import fetch from 'utils/fetch'

export function getMonitorLogList(data) {
    return fetch({
        url: '/securitylog/MonitorLog/findDetailList.do',
        method: 'post',
        data
    })
}
//监测日志机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/securitylog/MonitorLog/getServiceCode.do',
        method: 'post',
        data
    })
}