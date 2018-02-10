'use strict'
import fetch from 'utils/fetch'

export function getActiveSourceSearchDirList(data) {
    return fetch({
        url: '/commamnd/ActiveResourceCmd/findList.do',
        method: 'post',
        data
    })
}

//活跃资源查询指令机房列表
export function getServiceCode(data) {
    return fetch({
        url: '/commamnd/ActiveResourceCmd/getServiceCode.do',
        method: 'post',
        data
    })
}