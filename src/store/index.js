import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './tabs'
import userManage from './userManage'
import houseManage from './houseManage'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        tabs,
        userManage,
        houseManage
    }
})
