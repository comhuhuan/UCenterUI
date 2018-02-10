export default {
    setServerData({ commit }, tab) {
        commit('SET_SERVER_DATA', tab)
    },
    setUserData({ commit }, tab) {
        commit('SET_USER_DATA', tab)
    },
    setRoomData({ commit }, tab) {
        commit('SET_ROOM_DATA', tab)
    },
    setUserRead({ commit }, tab) {
        commit('SET_USER_READ', tab)
    },
    setServerRead({ commit }, tab) {
        commit('SET_SERVER_READ', tab)
    },
    setUserInputRead({ commit }, tab) {
        commit('SET_USERINPUT_READ', tab)
    },
    setServerInputShow({ commit }, tab) {
        commit('SET_SERVERINPUT_SHOW', tab)
    },

    setAdd({ commit }, tab) {
        commit('SET_ADD', tab)
    },
    setEdit({ commit }, tab) {
        commit('SET_EDIT', tab)
    },
    setActive({ commit }, tab) {
        commit('SET_ACTIVE_ID', tab)
    },

    setIsUser({ commit }, tab) {
        commit('SET_IS_USER', tab)
    },
    setIsServer({ commit }, tab) {
        commit('SET_IS_SERVER', tab)
    },
    setIsRoom({ commit }, tab) {
        commit('SET_IS_ROOM', tab)
    },
    setStep({ commit }, tab) {
        commit('SET_STEP', tab)
    },
    setServerRight({ commit }, tab) {
        commit('SET_SERVER_RIGHT', tab)
    },
   /* updateRoomData({ commit }, tab) {
        commit('UPDATE_ROOM_DATA', tab)
    },
    updateServerData({ commit }, tab) {
        commit('UPDATE_SERVER_DATA', tab)
    }*/
}
