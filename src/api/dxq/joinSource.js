'use strict'

import fetch from 'utils/fetch'

//域名列表
export function getDomainList(data) {
    return fetch({
        url: '/resource/domainManage/findList.do',
        method: 'post',
        data
    })
}
//域名下拉
export function getDomainSelect(data) {
    return fetch({
        url: '/resource/domainManage/init.do',
        method: 'post',
        data
    })
}

//IP地址列表
export function getIpAddressList(data) {
    return fetch({
        url: '/resource/ipAddress/findList.do',
        method: 'post',
        data
    })
}
//ip下拉框
export function getIpSelect(data) {
    return fetch({
        url: '/resource/ipAddress/init.do',
        method: 'post',
        data
    })
}

//IP域名列表
export function geIpAndDomainList(data) {
    return fetch({
        url: '/resource/ipDomain/findList.do',
        method: 'post',
        data
    })
}
//IP域名下拉框
export function getIpAndDomainSelect(data) {
    return fetch({
        url: '/resource/ipDomain/init.do',
        method: 'post',
        data
    })
}

//未备案域名列表
export function NoRecordDomainList(data) {
    return fetch({
        url: '/resource/unRecordDomain/findList.do',
        method: 'post',
        data
    })
}
//未备案域名详情
export function NoRecordDomainDetail(data) {
    return fetch({
        url: '/resource/unRecordDomain/viewDetail.do',
        method: 'post',
        data
    })
}
//域名详情
export function DomainManageDetail(data) {
    return fetch({
        url: '/resource/domainManage/viewDetail.do',
        method: 'post',
        data
    })
}


//未备案域名下拉框
export function NoRecordDomainSelect(data) {
    return fetch({
        url: '/resource/unRecordDomain/init.do',
        method: 'post',
        data
    })
}


