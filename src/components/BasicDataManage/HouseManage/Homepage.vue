<template lang="html">
    <section class="homepage">
        <PanelHead :options="panelOpt">
            <div slot="btnGroup">
                <el-button type="primary" size="mini" @click.native="editHandle"><i class="icon iconfont icon-xinzeng2"></i>&nbsp;新增</el-button>
            </div>
        </PanelHead>
        <el-table :data="houseList" border
            :loading="tableLoading"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="toggleRowExpansion"
            @selection-change="selectionChange"
            :max-height="tableMaxHeight"
        >
            <el-table-column type="selection" width="45"></el-table-column>
            <!-- IDC经营单位名称 -->
            <el-table-column label="IDC经营单位" prop="IDCUnitName" show-overflow-tooltip></el-table-column>
            <el-table-column label="机房名称" prop="houseName" show-overflow-tooltip></el-table-column>
            <el-table-column label="机房编号" prop="houseCode"></el-table-column>
            <el-table-column label="所在区域" prop="area" show-overflow-tooltip></el-table-column>
            <el-table-column label="机房性质" prop="houseProp"></el-table-column>
            <el-table-column label="机房地址" prop="addr" show-overflow-tooltip></el-table-column>
            <!-- 机房管理员信息 -->
            <el-table-column width="60" label="管理员" prop="manager"></el-table-column>
            <el-table-column width="70" label="是否上报" prop="isReport">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.isReport == 0 ? 'success' : 'warning'">{{ scope.row.isReport == 0 ? '已上报' : '未上报' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="未上报原因" prop="noReportReson" show-overflow-tooltip></el-table-column>
            <el-table-column label="回退状态" prop="returnStatus">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.returnStatus == 0 ? 'info' : 'danger'">{{ scope.row.returnStatus == 0 ? '正常' : '异常' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="148" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" class="send-loading" @click.native="issueHandle(scope.$index, scope.row)" :disabled="scope.row.isLoading">
                        下发
                        <i class="el-icon-loading" v-if="scope.row.isLoading"></i>
                    </el-button>
                    <span>|</span>
                    <el-button type="text" size="small" @click.native="editHandle(scope.$index, scope.row)">修改</el-button>
                    <span>|</span>
                    <el-button type="text" size="small" @click.native="detailHandle(scope.$index, scope.row)">详情</el-button>
                    <span>|</span>
                    <el-button type="text" size="small" @click.native="delHandle(scope.$index, scope.row)">删除</el-button>
                    <!-- <div class="operate-btns">
                        <div class="send-loading" v-show="scope.row.operationButton.isLoading">
                            <i class="el-icon-loading"></i>
                        </div>
                        <div class="btn-div" v-for="(btn, index) in scope.row.operationButton.list" :key="btn.type">
                            <el-button v-if="btn.type !== '9999'" type="text" size="small"
                                :title="btn.title" :disabled="btn.hidden"
                                @click="btnsHandle(btn, scope.row, scope.$index)"
                            >{{btn.text}}</el-button>
                            <el-popover trigger="click" placement="bottom-end"
                                popper-class="more-btns-popover" v-else
                            >
                                <div slot="reference">
                                    <el-button type="text" size="small" :title="btn.title"
                                        :disabled="btn.hidden"
                                    >
                                        {{btn.text}}
                                        <i v-if="btn.type === '9999'" class="el-icon-caret-bottom"></i>
                                    </el-button>
                                </div>
                                <ul>
                                    <li v-for="b in btn.btns" :key="b.type">
                                        <a href="javascript:;" :title="b.title" :class="{'is-disabled': b.hidden}" @click="btnsHandle(b, scope.row, scope.$index)">{{b.text}}</a>
                                    </li>
                                </ul>
                            </el-popover>
                        </div>
                    </div> -->

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
import { getHouseList, removeHouse } from 'api/gjg/houseManage'
import PanelHead from 'components/Common/PanelHead'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import houseMixin from './houseMixin'
import { mapMutations } from 'vuex'

export default {
    name: 'House',
    mixins: [tableMixin, pageMixin, houseMixin],
    components: {
        PanelHead
    },
    data() {
        const expandsKey = 'houseId'
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
                title: '机房列表'
            },
            ipAddrQuery: '',
            hasSelected: false,
            selectedList: [],
            removeFilters: {
                deleteIds: ''
            },
            gap: 217
        }
    },
    created() {
        // console.log(this.houseList)
    },
    computed: {

    },
    methods: {
        ...mapMutations({
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        selectionChange(selection) {
            console.log(selection)
            this.hasSelected = false
            if(selection.length > 0) {
                this.hasSelected = true
                const ids = []
                selection.forEach( item => {
                    ids.push(item.houseId)
                })
                // console.log(ids)
                this.removeFilters.deleteIds = ids.join(',')
                // console.log(this.removeFilters.deleteIds)
            }
        },
        delHandle(index, row) {
            this.$confirm('请确认是否删除此机房信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log(row)
                const params = row ? { deleteIds: row.houseId } : this.removeFilters
                this.tableLoading = true
                // console.log(params)
                // console.log(this.removeFilters)
                removeHouse(params).then( res => {
                    const flag = res.status === 'success'
                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '删除成功' : res.message,
                        // message: res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getHouseList()
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
                    subject: 'house',
                    data: row
                })
            } else {
                this.setCurEditor({
                    type: 'add',
                    subject: 'house'
                })
            }
        },
        issueHandle(index, row) {
            row.isLoading = true
            this.houseList.splice(index, 1, row)
            // this.houseList[index].isLoading = true
            console.log(row)
        },
        detailHandle(index, row) {
            this.$emit('show-detail', row)
        },
    }
}
</script>

<style lang="less" scoped>
    .homepage {
        width: 100%;
        // max-height: calc(~'100% - 20px');
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        overflow: auto;
        .el-table {
            margin-top: 10px;
            .el-button.send-loading {
                position: relative;


                i {
                    position: absolute;
                    display: block;
                    height: 100%;
                    width: 100%;
                    color: #06f;
                    font-size: 14px;
                    font-weight: bold;
                    top: 0;
                    left: 0;
                    // transform: translate(-50%, -50%);
                }
            }
        }

    }
</style>
