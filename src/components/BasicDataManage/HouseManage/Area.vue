<template lang="html">
    <section class="tablePage">

        <PanelHead :options="panelOpt">
            <div slot="btnGroup">
                <el-button type="primary" size="mini" @click.native="editHandle"><i class="icon iconfont icon-xinzeng2"></i>&nbsp;新增</el-button>
            </div>
        </PanelHead>
        <div class="options">
            <el-input placeholder="请输入机房片区名称或机房片区编号搜索" size="mini" v-model="areaQuery">
                <el-button slot="append" icon="el-icon-search" @click.native="getTableList"></el-button>
            </el-input>
        </div>
        <el-table :data="tableList" border
            :loading="tableLoading"
            @selection-change="selectionChange"
            :max-height="tableMaxHeight"
        >
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column label="机房名称" prop="houseName"></el-table-column>
            <el-table-column label="机房片区名称" prop="houseAreaName"></el-table-column>
            <el-table-column label="机房片区编号" prop="houseAreaCode"></el-table-column>
            <el-table-column label="所在区域" prop="area" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系人" prop="contact"></el-table-column>
            <el-table-column label="机房描述" prop="desc" show-overflow-tooltip></el-table-column>
            <el-table-column width="70" label="是否上报" prop="isReport">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.isReport == 0 ? 'success' : 'warning'">{{ scope.row.isReport == 0 ? '已上报' : '未上报' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="132" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native="editHandle(scope.$index, scope.row)">修改</el-button>
                    <span>&nbsp;|&nbsp;</span>
                    <!-- detailHandle(scope.$index, scope.row) -->
                    <el-button type="text" size="small" @click.native="detailHandle(scope.$index, scope.row)">详情</el-button>
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
import { getHouseAreaList, removeHouseArea } from 'api/gjg/houseManage'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import PanelHead from 'components/Common/PanelHead'
import { mapMutations } from 'vuex'

export default {
    name: 'Area',
    mixins: [tableMixin, pageMixin],
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
            tableList: [],
            tableLoading: false,
            panelOpt: {
                title: '机房区域列表'
            },
            areaQuery: '',
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
            setCurEditor: 'SET_CUR_HOUSE_EDITOR',
            setAreaInfo: 'SET_HOUSE_AREA_INFO'
        }),
        getTableList() {
            this.tableLoading = true
            // const params = {...this.params, ...this.pageFilters, ...{areaQuery: this.areaQuery}}
            console.log(this.params, this.pageFilters)
            const params = {...this.params, ...this.pageFilters}
            getHouseAreaList(params).then( res => {
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
                    ids.push(item.areaId)
                })
                // console.log(ids)
                this.removeFilters.deleteIds = ids.join(',')
                // console.log(this.removeFilters.deleteIds)
            }
        },
        delHandle(index, row) {
            // console.log(row)
            this.$confirm('请确认是否删除此机房区域信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = row ? { deleteIds: row.areaId } : this.removeFilters
                this.tableLoading = true
                // console.log(params)
                // console.log(this.removeFilters)
                removeHouseArea(params).then( res => {
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
                    subject: 'area',
                    data: row
                })
            } else {
                this.setCurEditor({
                    type: 'add',
                    subject: 'area'
                })
            }
        },
        detailHandle(index, row) {
            // this.setAreaInfo(row)
            this.$emit('show-detail', row)
        }
    }
}
</script>

<style lang="less" src="./tablePage.less" scoped></style>
<style lang="less" scoped>
/*    .el-table {
        margin-top: 10px;
    }*/
</style>
