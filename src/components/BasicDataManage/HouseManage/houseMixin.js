import { mapGetters, mapMutations } from 'vuex'

import {
    getHouseList,
    removeHouse,
} from 'api/gjg/houseManage'

export default {
    created() {
        console.log(this.houseList)
        if(this.houseList && this.houseList.length === 0) {
            this.getHouseList()
        }
    },
    computed: {
        ...mapGetters(['houseList', 'houseFilter'])
    },
    methods: {
        ...mapMutations({
            setHouseList: 'SET_HOUSE_LIST',
            setHouseFilter: 'SET_HOUSE_FILTER',
        }),
        getHouseList() {
            this.isLoading = true
            getHouseList(this.houseFilter).then( res => {
                if( res.status === 'success' ) {
                    if(res.message && res.message.rows) {
                        this.setHouseList(res.message.rows)
                        // this.getTreeData(res.message.rows, this.treeData[0].children)
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.isLoading = false
            }).catch( err => {
                console.log(err)
                this.isLoading = false
            })
        },
        addHandle() {

        },
        delHandle() {

        },
        modifyHandle() {

        },
        issueHandle(index, row) {
            // if(this.btnHandle)
            console.log('下发')
        }

    }
}
