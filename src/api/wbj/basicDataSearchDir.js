'use strict'
import fetch from 'utils/fetch'

export function getBasicDataSearchDirList(data) {
    return fetch({
        url: '/command/baseDataCmd/pagingList.do',
        method: 'post',
        data
    })
}

//基础数据查询下拉框
export function getBasicDataSearchDirSelect(data) {
    return fetch({
        url: '/recvCommand/baseDataCmd/init.do',
        method: 'post',
        data
    })
}