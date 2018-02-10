import defaultTab from './defaultTab'

export default {
	ADD_TABS(state, tab) {
		let exist = false
		state.tabs_list.some( item => {
            if(item.name === tab.name){
                exist = true
                state.active_tab = tab
                return true
            }
            return false
        })

	    if(!exist){
	        state.tabs_list.push(tab)
	        state.active_tab = tab
	    }
	    if(state.active_tab.path === '/houseManage') {
	    	state.is_collapse = true
	    }
        if(state.active_tab.path === '/userManage') {
            state.is_collapse = true
        }
	    // state.is_location = true
	},
	DEL_TAB(state, tabName) {
		// // 如果关掉最后一个tabs，则跳到首页
		if (state.tabs_list.length === 1) {
			state.active_tab = defaultTab
        	state.tabs_list = [defaultTab]
        	return
		}
		const newTabs = []
		state.tabs_list.forEach( item => {
            if(item.name !== tabName){
                newTabs.push(item)
            }
        })

        const len = newTabs.length
        if(len > 0) {
        	state.active_tab = newTabs[len - 1]
        	state.tabs_list = newTabs
        }
        if(state.active_tab.path === '/houseManage') {
	    	state.is_collapse = true
	    }
        if(state.active_tab.path === '/userManage') {
            state.is_collapse = true
        }
        state.is_location = false
	},
	SET_ACTIVE_TAB(state, tab) {
		state.active_tab = tab
		state.is_location = false
		if(state.active_tab.path === '/houseManage') {
	    	state.is_collapse = true
	    }
        if(state.active_tab.path === '/userManage') {
            state.is_collapse = true
        }
	},
	SET_IS_LOCATION(state) {
		state.is_location = true
	},
	SET_IS_COLLAPSE(state) {
		state.is_collapse = !state.is_collapse
	}
}
