/**
 * Created by xj-xtq-sy on 2018/1/25.
 */

import fetch from 'utils/fetch'

export function infoMonitorInit(data) {
    return fetch({
        url: '/strategy/infoMonitor/init.do',
        method: 'post',
        data
    })
}

export function getInfoMonitorList(data) {
    return fetch({
        url: '/strategy/infoMonitor/pagingList.do',
        method: 'post',
        data
    })
}

export function infoMonitorInitEdit(data) {
    return fetch({
        url: '/strategy/infoMonitor/initEdit.do',
        method: 'post',
        data
    })
}

export function infoMonitorInitRule(data) {
    return fetch({
        url: '/strategy/infoMonitor/initRule.do',
        method: 'post',
        data
    })
}

export function infoMonitorSave(data) {
    return fetch({
        url: '/strategy/infoMonitor/save.do',
        method: 'post',
        data
    })
}

export function infoMonitorSaveRule(data) {
    return fetch({
        url: '/strategy/infoMonitor/saveRule.do',
        method: 'post',
        data
    })
}

export function infoMonitorRemoveRule(data) {
    return fetch({
        url: '/strategy/infoMonitor/removeRule.do',
        method: 'post',
        data
    })
}

export function infoMonitorDelete(data) {
    return fetch({
        url: '/strategy/infoMonitor/delete.do',
        method: 'post',
        data
    })
}

export function infoMonitorSend(data) {
    return fetch({
        url: '/strategy/infoMonitor/send.do',
        method: 'post',
        data
    })
}

export function infoMonitorView(data) {
    return fetch({
        url: '/strategy/infoMonitor/pagingView.do',
        method: 'post',
        data
    })
}

export function infoMonitorPageEU(data) {
    return fetch({
        url: '/strategy/infoMonitor/batchSend.do',
        method: 'post',
        data
    })
}

export function infoMonitorOperation(data) {
    return fetch({
        url: '/strategy/infoMonitor/operation.do',
        method: 'post',
        data
    })
}
