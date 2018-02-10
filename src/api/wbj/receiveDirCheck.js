'use strict'
import fetch from 'utils/fetch'

export function getReceiveDirCheckList(data) {
    return fetch({
        url: '/command/receiveCmdVerify/pagingList.do',
        method: 'post',
        data
    })
}

//接收指令校验下拉框
export function getReceiveDirCheckSelect(data) {
    return fetch({
        url: '/recvCommand/cmdVerify/init.do',
        method: 'post',
        data
    })
}