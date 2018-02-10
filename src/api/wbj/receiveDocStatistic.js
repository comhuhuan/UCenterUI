'use strict'
import fetch from 'utils/fetch'

export function getReceiveDocStatisticList(data) {
    return fetch({
        url: '/statistics/RecieveFile/getChartData.do',
        method: 'post',
        data
    })
}
//接收文档统计接收数据类型列表
export function getCommandType(data) {
    return fetch({
        url: '/statistics/RecieveFile/getCommandType.do',
        method: 'post',
        data
    })
}