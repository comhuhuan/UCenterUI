'use strict'

import fetch from 'utils/fetch'

//IP类域名列表
export function IPCategoryList(data) {
    return fetch({
        url: '/specialresource/specialIpDomian/findList.do',
        method: 'post',
        data
    })
}
export function IPCategorySelect(data) {
    return fetch({
        url: '/specialresource/specialIpDomian/init.do',
        method: 'post',
        data
    })
}

//专线IP地址列表
export function lineIpManageList(data) {
    return fetch({
        url: '/specialresource/specialIp/findList.do',
        method: 'post',
        data
    })
}
export function lineIpManageSelect(data) {
    return fetch({
        url: '/specialresource/specialIp/init.do',
        method: 'post',
        data
    })
}

//专线域名备案
export function lineDomainRecordList(data) {
    return fetch({
        url: '/specialresource/specialDomainRecord/findList.do',
        method: 'post',
        data
    })
}
export function lineDomainRecordSelect(data) {
    return fetch({
        url: '/specialresource/specialDomainRecord/init.do',
        method: 'post',
        data
    })
}

//专线域名报备管理列表
export function lineDomainReportList(data) {
    return fetch({
        url: '/specialresource/specialDomainReport/findList.do',
        method: 'post',
        data
    })
}
export function lineDomainReportSelect(data) {
    return fetch({
        url: '/specialresource/specialDomainReport/init.do',
        method: 'post',
        data
    })
}

//专线网站管理
export function lineWebsiteList(data) {
    return fetch({
        url: '/specialresource/specialDomain/findList.do',
        method: 'post',
        data
    })
}
export function lineWebsiteSelect(data) {
    return fetch({
        url: '/specialresource/specialDomain/init.do',
        method: 'post',
        data
    })
}




