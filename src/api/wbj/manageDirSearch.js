'use strict'
import fetch from 'utils/fetch'

export function getManageDirSearchList(data) {
    return fetch({
        url: '/commamnd/ManageQueryCmd/findList.do',
        method: 'post',
        data
    })
}