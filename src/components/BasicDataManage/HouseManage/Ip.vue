<template lang="html">
    <section class="tablePage">
        <!--<div class="btn-line">
            <el-button-group>
                <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增',1)">新增</el-button>
                <el-button type="primary" disabled icon="el-icon-delete">批量删除</el-button>
            </el-button-group>
            <el-pagination @size-change="handleSizeChange" :current-page.sync="pageFilters.pageIndex" :page-size="pageFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
        </div>-->
        <PanelHead :options="panelOpt">
            <div slot="btnGroup">
                <el-button type="primary" size="mini" @click.native="editHandle"><i class="icon iconfont icon-xinzeng2"></i>&nbsp;新增</el-button>
            </div>
        </PanelHead>
        <div class="options">
            <el-input placeholder="请输入IP地址搜索" size="mini" v-model="ipAddrQuery">
                <el-button slot="append" icon="el-icon-search" @click.native="getTableList"></el-button>
            </el-input>
        </div>
        <el-table :data="tableList" border
            :loading="tableLoading"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="toggleRowExpansion"
            @selection-change="selectionChange"
            :max-height="tableMaxHeight"
        >
            <el-table-column type="expand" width="45">
                <template slot-scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="IP地址ID号：">
                            <span>{{ props.row.ipId }}</span>
                        </el-form-item>
                        <el-form-item label="使用单位证件类型：">
                            <span>{{ props.row.idenType }}</span>
                        </el-form-item>
                        <el-form-item label="对应证件号码：">
                            <span>{{  props.row.idenNum }}</span>
                        </el-form-item>
                        <el-form-item label="来源单位：">
                            <span>{{ props.row.unitSource }}</span>
                        </el-form-item>
                        <el-form-item label="分配单位：">
                            <span>{{ props.row.unitAllot }}</span>
                        </el-form-item>
                        <el-form-item label="分配使用时间：">
                            <span>{{ props.row.timeAllot }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column label="起始IP地址" prop="startIpAddr"></el-table-column>
            <el-table-column label="终止IP地址" prop="endIpAddr"></el-table-column>
            <el-table-column label="IP地址使用方式" prop="useType"></el-table-column>
            <el-table-column label="使用单位名称" prop="unitName" show-overflow-tooltip></el-table-column>
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
import { getIpList, removeIp } from 'api/gjg/houseManage'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import PanelHead from 'components/Common/PanelHead'
import { mapMutations } from 'vuex'

export default {
    name: 'Ip',
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
        const expandsKey = 'ipId'
        return {
            tableList: null,
            getRowKeys(row) {
                // console.log(row)
                return row[expandsKey]
            },
            expandsKey: expandsKey,
            detailsIsLoading: false,
            tableLoading: false,
            panelOpt: {
                title: 'IP地址段列表'
            },
            ipAddrQuery: '',
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
            const params = {...this.params, ...this.pageFilters, ipAddrQuery: this.ipAddrQuery}
            getIpList(params).then( res => {
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
                    ids.push(item.ipId)
                })
                // console.log(ids)
                this.removeFilters.deleteIds = ids.join(',')
                // console.log(this.removeFilters.deleteIds)
            }
        },
        delHandle(index, row) {
            // console.log(row)
            this.$confirm('请确认是否删除此IP地址段信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = row ? { deleteIds: row.ipId } : this.removeFilters
                this.tableLoading = true
                // console.log(params)
                // console.log(this.removeFilters)

                removeIp(params).then( res => {
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
            }).catch(() => {
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
                    subject: 'ip',
                    data: row
                })
            } else {
                this.setCurEditor({
                    type: 'add',
                    subject: 'ip'
                })
            }
        }
    }
}
</script>

<style lang="less" src="./tablePage.less" scoped></style>
