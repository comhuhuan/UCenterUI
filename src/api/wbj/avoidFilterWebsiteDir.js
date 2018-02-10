'use strict'
import fetch from 'utils/fetch'

export function getAvoidFilterWebsiteDirList(data) {
    return fetch({
        url: '/command/noFilterWebCmd/pagingList.do',
        method: 'post',
        data
    })
}

//免过滤网站指令下拉框
export function getAvoidFilterWebsiteDirSelect(data) {
    return fetch({
        url: '/command/noFilterWebCmd/init.do',
        method: 'post',
        data
    })
}