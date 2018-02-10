<template lang="html">
    <section class="EuDetailPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <el-form label-width="auto" inline :model="fromFilters" ref="fromFilters">
            <el-form-item label="机房名称：" prop="serviceCodeQuery">
                <el-select size="mini" v-model="fromFilters.serviceCodeQuery" placeholder="请选择机房名称">
                    <el-option v-for="item in parentData.serviceCodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="EU名称：" prop="euNameQuery">
                <el-input size="mini" placeholder="请输入EU名称" v-model="fromFilters.euNameQuery" ></el-input>
            </el-form-item>

            <el-form-item label="状态：" prop="resultCodeQuery">
                <el-select size="mini" v-model="fromFilters.resultCodeQuery" placeholder="请选择状态">
                    <el-option v-for="item in resultCodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTableList">搜索</el-button>
                <el-button type="primary" @click="resetForm('formFilter')">重置</el-button>
            </el-form-item>
        </el-form>

    	<div class="parting-line"></div>

        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
            <el-table-column label="机房名称" prop="serviceName"></el-table-column>
            <el-table-column label="EU名称" prop="euName"></el-table-column>
            <el-table-column label="状态" prop="resultCode"></el-table-column>
            <el-table-column label="时间" prop="curTime"></el-table-column>
            <el-table-column label="描述" prop="msgInfo" show-overflow-tooltip></el-table-column>
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
import { getPagingEu } from 'api/gjg/infoMonitoring'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import PanelHead from 'components/Common/PanelHead'

export default {
    name: 'EUDetail',
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
                title: 'EU详情',
                hasIcon: true
            },
            fromFilters: {
                serviceCodeQuery: "",
                euNameQuery: "",
                resultCodeQuery: "",
            },
            serviceCodeList: null,
            resultCodeList: [
                {label: '全部', value: ''},
                {label: '下发成功', value: 1},
                {label: '取消成功', value: 2},
                {label: '失败', value: 999},
            ],
            gap: 275
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
                ...this.formFilter,
                commandId: this.parentData.commandId,
                idcCommandId: this.parentData.idcCommandId
            }
            getPagingEu(params).then( res => {
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
    .EuDetailPage {
        max-height: 100%;
        overflow: auto;
        margin-top: -10px;
        .el-table, .el-form {
            margin-top: 10px;
        }
        .el-form {

        }
    }
</style>
