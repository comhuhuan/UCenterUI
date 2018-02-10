/**
 * Created by xj-xtq-sy on 2018/1/24.
 */
import fetch from 'utils/fetch'

export function getActiveSourceperiodList(data) {
    return fetch({
        url: '/strategy/activeResource/pagingList.do',
        method: 'post',
        data
    })
}

export function activeResourceInit(data) {
    return fetch({
        url: '/strategy/activeResource/init.do',
        method: 'post',
        data
    })
}

export function setActivePeriod(data) {
    return fetch({
        url: '/strategy/activeResource/save.do',
        method: 'post',
        data
    })
}
