export default {
	set_active_tab({ commit }, tab) {
		commit('SET_ACTIVE_TAB', tab)
	},
	add_tabs({ commit }, tab) {
		commit('ADD_TABS', tab)
	},
	del_tab({ commit }, tabName) {
		console.log(tabName)
		commit('DEL_TAB', tabName)
	},
	set_routes( { commit }, routes) {
		commit('SET_ROUTES', routes)
	}
}