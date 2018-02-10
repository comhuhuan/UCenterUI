

export default {

    SET_USER_DATA(state, userData) {
        state.userData=userData
        console.log(state)
    },
    SET_SERVER_DATA(state, serverData) {
		state.serverData=serverData
	},
/*    UPDATE_SERVER_DATA(state, userId) {    //服务更新所属用户的方法
        state.serverData.userId=userId
    },*/
    SET_ROOM_DATA(state, roomData) {
        state.roomData=roomData
    },
/*    UPDATE_ROOM_DATA(state, userId) {    //机房更新所属用户的方法
        state.roomData.userId=userId
    },*/

    SET_USER_READ(state, flag) {
		state.userRead=flag
	},
    SET_SERVER_READ(state, flag) {
		state.serverRead=flag
	},
    SET_USERINPUT_READ(state, flag) {
		state.userInputRead=flag
	},
    SET_SERVERINPUT_SHOW(state, flag) {
		state.serverInputShow=flag
	},

    SET_ADD(state, flag) {
		state.isAdd=flag
	},
    SET_EDIT(state, flag) {
		state.isEdit=flag
	},
    SET_ACTIVE_ID(state, activeId) {
		state.activeId=activeId
	},

    SET_IS_USER(state, isUser) {
		state.isUser=isUser
	},
    SET_IS_SERVER(state, isServer) {
		state.isServer=isServer
	},
    SET_IS_ROOM(state, isRoom) {
		state.isRoom=isRoom
	},
    SET_STEP(state, step) {
		state.step=step
	},
    SET_SERVER_RIGHT(state, flag) {
        state.serverEdit=flag
    },
}
