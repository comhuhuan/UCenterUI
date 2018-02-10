'use strict'

import fetch from 'utils/fetch'

export function getHouseList(data) {
	return fetch({
	    url: '/baseData/houseManage/PageList.do',
	    method: 'post',
	    data
  	})
}

export function removeHouse(data) {
	return fetch({
	    url: '/baseData/houseManage/remove.do',
	    method: 'post',
	    data
  	})
}

export function saveHouse(data) {
	return fetch({
	    url: '/baseData/houseManage/save.do',
	    method: 'post',
	    data
  	})
}

export function getHouseAreaList(data) {
	return fetch({
	    url: '/baseData/houseAreaManage/PageList.do',
	    method: 'post',
	    data
  	})
}

export function removeHouseArea(data) {
	return fetch({
	    url: '/baseData/houseAreaManage/remove.do',
	    method: 'post',
	    data
  	})
}

export function saveHouseArea(data) {
	return fetch({
	    url: '/baseData/houseAreaManage/save.do',
	    method: 'post',
	    data
  	})
}

export function getIpList(data) {
	return fetch({
	    url: '/baseData/ipManage/PageList.do',
	    method: 'post',
	    data
  	})
}

export function removeIp(data) {
	return fetch({
	    url: '/baseData/ipManage/remove.do',
	    method: 'post',
	    data
  	})
}

export function saveIp(data) {
	return fetch({
	    url: '/baseData/ipManage/save.do',
	    method: 'post',
	    data
  	})
}

export function getNetworkList(data) {
	return fetch({
	    url: '/baseData/networkManage/PageList.do',
	    method: 'post',
	    data
  	})
}

export function removeNetwork(data) {
	return fetch({
	    url: '/baseData/networkManage/remove.do',
	    method: 'post',
	    data
  	})
}

export function saveNetwork(data) {
	return fetch({
	    url: '/baseData/networkManage/save.do',
	    method: 'post',
	    data
  	})
}

export function getCabinetList(data) {
	return fetch({
	    url: '/baseData/cabinetManage/PageList.do',
	    method: 'post',
	    data
  	})
}

export function removeCabinet(data) {
	return fetch({
	    url: '/baseData/cabinetManage/remove.do',
	    method: 'post',
	    data
  	})
}

export function saveCabinet(data) {
	return fetch({
	    url: '/baseData/cabinetManage/save.do',
	    method: 'post',
	    data
  	})
}

export function importHouse(data) {
	return fetch({
	    url: '/baseData/houseManage/import.do',
	    method: 'post',
	    data
  	})
}

export function importHouseArea(data) {
	return fetch({
	    url: '/baseData/houseAreaManage/import.do',
	    method: 'post',
	    data
  	})
}

export function importIp(data) {
	return fetch({
	    url: '/baseData/ipManage/import.do',
	    method: 'post',
	    data
  	})
}

export function importNetwork(data) {
	return fetch({
	    url: '/baseData/networkManage/import.do',
	    method: 'post',
	    data
  	})
}

export function exportHouse(data) {
	return fetch({
	    url: '/baseData/houseManage/export.do',
	    method: 'post',
	    data
  	})
}

export function exportHouseArea(data) {
	return fetch({
	    url: '/baseData/houseAreaManage/export.do',
	    method: 'post',
	    data
  	})
}

export function exportIp(data) {
	return fetch({
	    url: '/baseData/ipManage/export.do',
	    method: 'post',
	    data
  	})
}

export function exportNetwork(data) {
	return fetch({
	    url: '/baseData/networkManage/export.do',
	    method: 'post',
	    data
  	})
}
