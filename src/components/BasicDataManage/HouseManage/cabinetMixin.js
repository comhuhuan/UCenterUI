import { getCabinetList, removeCabinet } from 'api/gjg/houseManage'
import pageMixin from '@/mixins/pageMixin'
import { mapGetters, mapMutations } from 'vuex'

export default {
    mixins: [pageMixin],
    data() {
        const expandsKey = 'cabId'
        return {
            tableList: null,
            getRowKeys(row) {
                // console.log(row)
                return row[expandsKey]
            },
            expandsKey: expandsKey,
            removeFilters: {
                deleteIds: ''
            },
            hasSelected: false,
            selectedList: [],
            tableLoading: false,
            params: null
        }
    },
    computed: {
        ...mapGetters({
            isShowEditor: 'isShowHouseEditor',
            curEditorType: "curHouseEditorType",
        })
    },
    created() {
        if(!this.isShowEditor || this.isShowEditor && this.curEditorType === 'modify') {
            this.getTableList()
        }

    },
    methods: {
        ...mapMutations({
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        getTableList() {
            this.tableLoading = true
            const params = {...this.params, ...this.pageFilters}
            getCabinetList(params).then( res => {
                if( res.status === 'success' ) {
                    this.tableList = res.message && res.message.rows ? res.message.rows : []
                    this.total = res.message.total
                    // this.total = 100
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.tableLoading = false
            }).catch( err => {
                console.log(err)
                this.tableLoading = false
            })
        },
        selectionChange(selection) {
            console.log(selection)
            this.hasSelected = false
            if(selection.length > 0) {
                this.hasSelected = true
                const ids = []
                selection.forEach( item => {
                    ids.push(item.cabId)
                })
                this.removeFilters.deleteIds = ids.join(',')
            }
        },
        delHandle(index, row) {
            const params = row ? { deleteIds: row.cabId } : this.removeFilters
            this.tableLoading = true
            removeCabinet(params).then( res => {
                const flag = res.status === 'success'
                this.$message({
                    type: flag ? 'success' : 'error',
                    message: flag ? '删除成功' : res.message,
                    // message: res.message,
                    showClose: true,
                })
                if( flag ) {
                    this.getTableList()
                }
                this.tableLoading = false
            }).catch( err => {
                console.log(err)
                this.tableLoading = false
            })
        },
        editHandle(index, row) {
            if(row) {
                if(this.isShowEditor) {
                    this.isCabinetExpand = true
                    this.isAreaExpand = false
                    this.cabinetFilter = row
                }
            } else {
                this.setCurEditor({
                    type: 'modify',
                    subject: 'area',
                    data: row,
                    isCabinetModify: true
                })
            }
        }
    }
}
