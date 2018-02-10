'use strict'
import fetch from 'utils/fetch'

export function getVisitLogSearchList(data) {
    return fetch({
        url: '/accesslog/AccessLogQuery/findResult.do',
        method: 'post',
        data
    })
}
