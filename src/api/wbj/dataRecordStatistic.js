'use strict'
import fetch from 'utils/fetch'

export function getDataRecordStatisticList(data) {
    return fetch({
        url: '/command/DataReport/list.do',
        method: 'post',
        data
    })
}

//数据上报统计数据类型列表
export function getCommandType(data) {
    return fetch({
        url: '/commamnd/DataReport/getComnandType.do',
        method: 'post',
        data
    })
}