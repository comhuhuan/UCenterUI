'use strict'
import fetch from 'utils/fetch'

export function getInfoSaftyManageDirList(data) {
    return fetch({
        url: '/command/infoSecurityCmd/pagingList.do',
        method: 'post',
        data
    })
}
//信息安全指令详情
export function getInfoSaftyManageDirDetail(data) {
    return fetch({
        url: '/command/infoSecurity/viewDetail.do',
        method: 'post',
        data
    })
}
//信息安全指令下拉框
export function getInfoSaftyManageDirSelect(data) {
    return fetch({
        url: '/recvCommand/infoSecurityCmd/init.do',
        method: 'post',
        data
    })
}