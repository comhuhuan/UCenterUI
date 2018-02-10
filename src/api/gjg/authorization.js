'use strict'

import fetch from 'utils/fetch'

export function getMenus(data = {}) {
	return fetch({
		url: '/sso/sso/initSub.do',
		method: 'post',
		data
	})
}
