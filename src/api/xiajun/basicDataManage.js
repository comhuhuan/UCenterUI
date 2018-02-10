/**
 * Created by xj-xtq-sy on 2018/1/9.
 */

import fetch from 'utils/fetch'

export function getTakeUpRoomList(data) {
    return fetch({
        url: '/takeUpRoomList',
        method: 'post',
        data
    })
}

export function getDutyOfficerList(data) {
    return fetch({
        url: '/baseData/liablePersonManage/PageList.do',
        method: 'post',
        data
    })
}

export function getIdcOperatorList(data) {
    return fetch({
        url: '/baseData/operManage/PageList.do',
        method: 'post',
        data
    })
}

export function showIdcOperatorDetail(data) {
    return fetch({
        url: '/baseData/operManage/findDetailById.do',
        method: 'post',
        data
    })
}

export function saveDutyOfficer(data) {
    return fetch({
        url: '/basedata/chargePerson/save.do',
        method: 'post',
        data
    })
}

export function findIdenTypeById(data) {
    return fetch({
        url: '/basedata/chargePerson/findIdenTypeById.do',
        method: 'post',
        data
    })
}

export function removeDutyOfficer(data){
    return fetch({
        url: '/basedata/chargePerson/remove.do',
        method: 'post',
        data
    })
}

export function removeIdcOperator(data) {
    return fetch({
        url: '/basedata/idcOperator/remove.do',
        method: 'post',
        data
    })
}

export function saveIdcOperator(data) {
    return fetch({
        url: '/basedata/idcOperator/save.do',
        method: 'post',
        data
    })
}

export function findUser(data){
    return fetch({
        url: '/basedata/idcOperator/findUser.do',
        method: 'post',
        data
    })
}
