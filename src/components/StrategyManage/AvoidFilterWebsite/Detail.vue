<template>
    <section class="detailPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>        
        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight" style="margin-top:10px;">
            <el-table-column label="下发范围" prop="serviceName" show-overflow-tooltip></el-table-column>
            <el-table-column label="免过滤指令ID" prop="commandId"></el-table-column>
            <el-table-column label="免过滤类型" prop="type">
              <template slot-scope="scope">
                <span v-if="scope.row.type === 1">域名</span>
                <span v-else-if="scope.row.type === 2">IP</span>
              </template>            
            </el-table-column>
            <el-table-column label="免过滤内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column label="匹配模式" prop="matchModel"></el-table-column>
            <el-table-column label="执行状态" prop="excStateLabel">   
            </el-table-column>
        </el-table>
        <div class="bottom-operate">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageFilters.pageIndex"
              :page-size="pageFilters.pageSize"
              :page-sizes="pageSizes"
              layout="total, sizes,prev, pager, next, jumper"
              :total="total">
          </el-pagination>
      </div>
    </section>
</template>

<script>
    import {getNoFilterDetailList} from 'api/fufan/avoidFilterWebsite'
    import tableMixin from '@/mixins/tableMixin'
    import pageMixin from '@/mixins/pageMixin'
    import formMixin from '@/mixins/formMixin'
    import commonMixin from './commonMixin'
    import PanelHead from 'components/Common/PanelHead'

    export default {
        name: 'Detail',
        components: {
            PanelHead
        }, 
        mixins: [tableMixin, pageMixin, formMixin, commonMixin],     
        props: {
            parentData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                formFilters: {
                    idcCommandId: this.parentData.idcCommandId
                },
                tableLoading: false,
                total: 0,
                tableList: [],
                panelOpt: {
                    title: this.parentData.name,
                    hasIcon: true
                },
                matchModeList: this.parentData.matchModeList,
                gap: 218
            }
        },
        created(){
            this.getTableList()
        },
        methods: {   
            //获取列表数据
            getTableList() {
                this.tableLoading = true
                const params = {...this.formFilters, ...this.pageFilters}
                getNoFilterDetailList(params).then(res => {
                    if (res.status === 'success') {
                        this.tableList = res.message.rows
                        this.total = res.message.total
                        this.transMatchMode()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true,
                        })
                    }
                    this.tableLoading = false
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
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
