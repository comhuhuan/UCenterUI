<template lang="html">
    <section class="tablePage">
        <PanelHead :options="panelOpt">
            <div slot="btnGroup">
                <el-button type="primary" size="mini" @click.native="editHandle"><i class="icon iconfont icon-xinzeng2"></i>&nbsp;新增</el-button>
            </div>
        </PanelHead>
        <div class="options">
            <el-input placeholder="请输入出入口网关IP地址搜索" v-model="addrQuery" size="mini">
                <el-button slot="append" icon="el-icon-search" @click.native="getTableList"></el-button>
            </el-input>
        </div>
        <el-table :data="tableList" border :loading="tableLoading" @selection-change="selectionChange" :max-height="tableMaxHeight">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column label="互联网出入口ID" prop="networkId"></el-table-column>
            <el-table-column label="互联网出入口带宽(MB)" prop="networkWB"></el-table-column>
            <el-table-column width="70" label="链路类型" prop="linkType"></el-table-column>
            <el-table-column label="串链路接入单位名称" prop="unitName" show-overflow-tooltip></el-table-column>
            <el-table-column label="互联网出入口网关IP地址" prop="addr"></el-table-column>
            <el-table-column width="70" label="是否上报" prop="isReport">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.isReport == 0 ? 'success' : 'warning'">{{ scope.row.isReport == 0 ? '已上报' : '未上报' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="90" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native="editHandle(scope.$index, scope.row)">修改</el-button>
                    <span>&nbsp;|&nbsp;</span>
                    <el-button type="text" size="small" @click.native="delHandle(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom-operate">
            <el-button type="primary" :disabled="!hasSelected" @click.native="delHandle">批量删除</el-button>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageFilters.pageIndex"
                :page-size="pageFilters.pageSize"
                :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import { getNetworkList, removeNetwork } from 'api/gjg/houseManage'
import pageMixin from '@/mixins/pageMixin'
import tableMixin from '@/mixins/tableMixin'
import PanelHead from 'components/Common/PanelHead'
import { mapMutations } from 'vuex'

export default {
    name: 'Network',
    mixins: [pageMixin, tableMixin],
    props: {
        params: {
            type: Object,
            default: {}
        }
    },
    components: {
        PanelHead
    },
    data() {
        return {
            tableList: null,
            tableLoading: false,
            panelOpt: {
                title: '互联网出入口信息'
            },
            addrQuery: '',
            hasSelected: false,
            selectedList: [],
            removeFilters: {
                deleteIds: ''
            },
            gap: 252
        }
    },
    created() {
        this.getTableList()
    },
    methods: {
        ...mapMutations({
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        getTableList() {
            this.tableLoading = true
            const params = {...this.params, ...this.pageFilters}
            getNetworkList(params).then( res => {
                if( res.status === 'success' ) {
                    this.tableList =  res.message && res.message.rows ? res.message.rows : []
                    // console.log(this.tableList)
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
                this.tableLoading = false
            })
        },
        selectionChange(selection) {
            // console.log(selection)
            this.hasSelected = false
            if(selection.length > 0) {
                this.hasSelected = true
                const ids = []
                selection.forEach( item => {
                    ids.push(item.networkId)
                })
                this.removeFilters.deleteIds = ids.join(',')
            }
        },
        delHandle(index, row) {
            this.$confirm('请确认是否删除此互联网出入口信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableLoading = true
                // console.log(this.removeFilters)
                const params = row ? { deleteIds: row.networkId } : this.removeFilters
                removeNetwork(params).then( res => {
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
            }).catch( _ => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！',
                    showClose: true
                })
            })
        },
        editHandle(index, row) {
            if(row) {
                this.setCurEditor({
                    type: 'modify',
                    subject: 'network',
                    data: row
                })
            } else {
                this.setCurEditor({
                    type: 'add',
                    subject: 'network'
                })
            }
        }
    }
}
</script>

<style lang="less" src="./tablePage.less" scoped></style>
<style lang="less" scoped>
    /*.el-table {
        margin-top: 10px;
    }*/
</style>
