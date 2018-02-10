<template lang="html">
    <section class="detailPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
            <el-table-column label="下发场所" prop="serviceName"></el-table-column>
            <el-table-column label="过滤编号" prop="schemeId"></el-table-column>
            <el-table-column label="过滤种类" prop="subtypeName"></el-table-column>
            <el-table-column label="内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column label="匹配模式" prop="matchModel"></el-table-column>
            <el-table-column label="执行状态" prop="excStateLabel"></el-table-column>
        </el-table>
        <div class="bottom-operate">
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
import { getPagingView } from 'api/gjg/infoMonitoring'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import PanelHead from 'components/Common/PanelHead'

export default {
    name: 'Detail',
    mixins: [tableMixin, pageMixin],
    props: {
        parentData: {
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
                title: '详情',
                hasIcon: true
            },
            gap: 218
        }
    },
    created() {
        this.getTableList()
    },
    methods: {
        getTableList() {
            this.tableLoading = true
            const params = {
                ...this.pageFilters,
                commandId: this.parentData.commandId,
                expiredTime: this.parentData.expiredTime
            }
            getPagingView(params).then( res => {
                if( res.status === 'success' ) {
                    this.tableList = res.message && res.message.rows ? res.message.rows : []
                    this.total = res.message.total
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
        backHandle() {
            this.$emit('removeTab', this.parentData.name)
        }
    }
}
</script>
<style lang="less">
    .detailPage {
        max-height: 100%;
        overflow: auto;
        margin-top: -10px;
        .el-table {
            margin-top: 10px;
        }
    }
</style>
