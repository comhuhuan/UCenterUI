'use strict'
import fetch from 'utils/fetch'

export function getLogRecordStatisticList(data) {
    return fetch({
        url: '/statistics/LogReport/getChartData.do',
        method: 'post',
        data
    })
}
//日志上报统计指令类型列表
export function getCommandType(data) {
    return fetch({
        url: '/statistics/LogReport/getCommandType.do',
        method: 'post',
        data
    })
}