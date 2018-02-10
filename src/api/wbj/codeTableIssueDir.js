'use strict'
import fetch from 'utils/fetch'

export function getCodeTableIssueDirList(data) {
    return fetch({
        url: '/command/codeListIssuseCmd/pagingList.do',
        method: 'post',
        data
    })
}

//代码表发布指令下拉框
export function getCodeTableIssueDirSelect(data) {
    return fetch({
        url: '/command/codeListIssuseCmd/init.do',
        method: 'post',
        data
    })
}