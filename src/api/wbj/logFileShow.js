'use strict'
import fetch from 'utils/fetch'

export function getLogFileShowList(data) {
    return fetch({
        url: '/recievelog/LogFile/list.do',
        method: 'post',
        data
    })
}
//日志文件展示机房名称
export function getServiceCode(data) {
    return fetch({
        url: '/recievelog/LogFile/getServiceCode.do',
        method: 'post',
        data
    })
}