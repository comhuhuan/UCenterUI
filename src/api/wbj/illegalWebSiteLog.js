'use strict'
import fetch from 'utils/fetch'

export function getIllegalWebSiteLogList(data) {
    return fetch({
        url: '/activeLog/IllegalWebLog/findIllegalWebLogs.do',
        method: 'post',
        data
    })
}
//违法违规网站日志机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/activeLog/IllegalWebLog/getServiceCode.do',
        method: 'post',
        data
    })
}