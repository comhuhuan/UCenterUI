'use strict'

import fetch from 'utils/fetch'

export function getNoFilterWebInit(data) {
    return fetch({
        url: '/strategy/noFilterWeb/init.do',
        method: 'post',
        data
    })
}

export function getNoFilterWebList(data) {
    return fetch({
        url: '/strategy/noFilterWeb/pagingList.do',
        method: 'post',
        data
    })
}

export function getNoFilterDetailList(data) {
    return fetch({
        url: '/strategy/noFilterWeb/pagingView.do',
        method: 'post',
        data
    })
}

export function getNoFilterEuList(data) {
    return fetch({
        url: '/strategy/noFIlterWeb/pagingEu.do',
        method: 'post',
        data
    })
}

export function deleteList(data) {
    return fetch({
        url: '/strategy/noFilterWeb/delete.do',
        method: 'post',
        data
    })
}

export function getInitEdit(data) {
    return fetch({
        url: '/strategy/noFilterWeb/initEdit.do',
        method: 'post',
        data
    })
}

export function getInitRule(data) {
    return fetch({
        url: '/strategy/noFilterWeb/initRule.do',
        method: 'post',
        data
    })
}

export function save(data) {
    return fetch({
        url: '/strategy/noFIlterWeb/save.do',
        method: 'post',
        data
    })
}

export function saveRule(data) {
    return fetch({
        url: '/strategy/noFilterWeb/saveRule.do',
        method: 'post',
        data
    })
}

export function removeRule(data) {
    return fetch({
        url: '/strategy/noFilterWeb/removeRule.do',
        method: 'post',
        data
    })
}

export function send(data) {
    return fetch({
        url: '/strategy/noFilterWeb/send.do',
        method: 'post',
        data
    })
}

export function batchSend(data) {
    return fetch({
        url: '/strategy/noFIlterWeb/batchSend.do',
        method: 'post',
        data
    })
}

export function getOperation(data) {
    return fetch({
        url: '/strategy/noFilterWeb/operation.do',
        method: 'post',
        data
    })
}

 