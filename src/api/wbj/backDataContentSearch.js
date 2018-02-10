'use strict'
import fetch from 'utils/fetch'

export function getBackDataContentSearchList(data) {
    return fetch({
        url: '/command/returnBackData/pagingList.do',
        method: 'post',
        data
    })
}
//回退数据内容查询详情
export function getBackDataContentSearchDetail(data) {
    return fetch({
        url: '/command/returnBackData/view.do',
        method: 'post',
        data
    })
}

//回退数据内容查询下拉框
export function getBackDataContentSearchSelect(data) {
    return fetch({
        url: '/recvCommand/returnBackData/init.do',
        method: 'post',
        data
    })
}