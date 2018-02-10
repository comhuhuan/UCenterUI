export default {
    SET_IS_SHOW_HOUSSE_EDITOR(state, boolean) {
		state.isShowHouseEditor = boolean
        console.log(state.isShowHomePage)
	},
	SET_CUR_HOUSE_EDITOR(state, {type, subject, data, isCabinetModify}) {
        // console.log(type, subject)
		state.houseEditorMenus.some( editor => {
			if(type === editor.type) {
				state.curHouseEditorMenu = editor.menus
                state.curHouseEditorType = editor.type
                // console.log(editor)
                editor.menus.some( item => {
                    // console.log(item.subject)
                    if( item.subject === subject ) {
                        state.curHouseEditorOptions = { ...item, data, isCabinetModify }
                        state.isShowHouseEditor = true
                        // state.isShowHomePage = false
                        return true
                    }
                })
                return true
			}
		})
        // console.log(state.curHouseEditorOptions, state.isShowHouseEditor, state.curHouseEditorMenu )
	},
    SET_HOUSE_LIST(state, list) {
        state.houseList = list
    },
    SET_HOUSE_FILTER(state, filters) {
        state.houseFilter = {...state.houseFilter, ...filters}
    },
    SET_IS_SHOW_HOME_PAGE(state, boolean) {
        state.isShowHomePage = boolean
    },
    SET_HOUSE_AREA_INFO(state, data) {
        state.houseAreaInfo = data
    }
}
