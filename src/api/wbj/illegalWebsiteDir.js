'use strict'
import fetch from 'utils/fetch'

export function getIllegalWebsiteDirList(data) {
    return fetch({
        url: '/commamnd/IllegalWebCmd/findList.do',
        method: 'post',
        data
    })
}

//违法网站指令机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/commamnd/IllegalWebCmd/getServiceCode.do',
        method: 'post',
        data
    })
}