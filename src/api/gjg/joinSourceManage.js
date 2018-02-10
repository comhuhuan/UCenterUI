'use strict'

import fetch from 'utils/fetch'

export function getNoRecordDomainList(data) {
	return fetch({
	    url: '/noRecordDomainList',
	    method: 'post',
	    data
  	})
}