'use strict'
import fetch from 'utils/fetch'

export function getBasicDataAbnormalList(data) {
    return fetch({
        url: '/securitylog/BaseDataMonitor/findIpStatusList.do',
        method: 'post',
        data
    })
}
//基础数据异常监测机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/securitylog/BaseDataMonitor/getServiceCode.do',
        method: 'post',
        data
    })
}