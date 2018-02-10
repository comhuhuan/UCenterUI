'use strict'

import fetch from 'utils/fetch'

export function getUserManageList(data) {
    return fetch({
        url: '/basedata/userManage/pagingList.do',
        method: 'post',
        data
    })
}
//单位属性
export function comList(data) {
    return fetch({
        url: '/basedata/userManage/findUnitKindById.do',
        method: 'post',
        data
    })
}
//证件类型
export function cardList(data) {
    return fetch({
        url: '/basedata/userManage/findIdenTypeById.do',
        method: 'post',
        data
    })
}
//IDC下拉
export function idcList(data) {
    return fetch({
        url: '/baseData/userManage/findIdcOperator.do',
        method: 'post',
        data
    })
}
//安全责任人弹窗
export function SaverList(data) {
    return fetch({
        url: '/basedata/userManage/findUser.do',
        method: 'post',
        data
    })
}
//备案类型
export function baList(data) {
    return fetch({
        url: '/basedata/appService/findWebRegType.do',
        method: 'post',
        data
    })
}
//接入方式
export function modeList(data) {
    return fetch({
        url: '/basedata/appService/findEthernetById.do',
        method: 'post',
        data
    })
}

//所属机房
export function houseList(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/findHouseById.do',
        method: 'post',
        data
    })
}
//所属片区
export function houseAreaList(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/findHouseRoomById.do',
        method: 'post',
        data
    })
}
//所属机柜
export function cabinetIdList(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/findCabById.do',
        method: 'post',
        data
    })
}


//用户删除
export function getUserManageDel(data) {
    return fetch({
        url: '/basedata/userManage/remove.do',
        method: 'post',
        data
    })
}
//用户详情
export function getUserManageDetail(data) {
    return fetch({
        url: '/basedata/userManage/findDetailById.do',
        method: 'post',
        data
    })
}

export function getApplyServerManageList(data) {
    return fetch({
        url: '/basedata/appService/PageList.do',
        method: 'post',
        data
    })
}
//服务删除
export function getApplyServerManageDel(data) {
    return fetch({
        url: '/basedata/appService/remove.do',
        method: 'post',
        data
    })
}

export function getTakeUpRoomList(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/PageList.do',
        method: 'post',
        data
    })
}
//机房下面的所属服务
export function theServer(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/findServiceByUserId.do',
        method: 'post',
        data
    })
}

//机房删除
export function getTakeUpRoomDel(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/remove.do',
        method: 'post',
        data
    })
}

export function UserDetail(data) {
    return fetch({
        url: '/base/userManage/save.do',
        method: 'post',
        data
    })
}
export function ServerDetail(data) {
    return fetch({
        url: '/basedata/appService/save.do',
        method: 'post',
        data
    })
}
export function RoomDetail(data) {
    return fetch({
        url: '/basedata/occupyServiceRoom/save.do',
        method: 'post',
        data
    })
}

export function getUserList(data) {
    return fetch({
        url: '/basedata/appService/findUserUnitById.do',
        method: 'post',
        data
    })
}
