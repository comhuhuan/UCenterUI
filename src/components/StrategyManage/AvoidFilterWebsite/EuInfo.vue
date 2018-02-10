<template>
    <section class="EuDetailPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>          
        <el-form label-width="auto" inline :model="formFilters" :rules="fromRules" ref="formFilters" style="margin-top:10px;">
            <el-form-item label="机房名称" prop="serviceCodeQuery">
              <el-select v-model="formFilters.serviceCodeQuery" size="mini" placeholder="请选择机房名称">
                <el-option v-for="item in houseList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="EU名称">
                <el-input v-model="formFilters.eunNameQuery" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="resultCodeQuery">
                <el-select v-model="formFilters.resultCodeQuery" size="mini" placeholder="请选择状态">
                    <el-option v-for="item in resultList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchEvt">搜索</el-button>
                <el-button type="default" @click="czEvt">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="parting-line"></div>        
        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
            <el-table-column label="机房名称" prop="serviceName" show-overflow-tooltip ></el-table-column>
            <el-table-column label="EU名称" prop="eunName" show-overflow-tooltip ></el-table-column>
            <el-table-column label="状态" prop="resultCode"></el-table-column>
            <el-table-column label="时间" prop="curTime"></el-table-column>
            <el-table-column label="描述" prop="msgInfo" show-overflow-tooltip ></el-table-column>
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
    import {getNoFilterEuList} from 'api/fufan/avoidFilterWebsite'
    import tableMixin from '@/mixins/tableMixin'
    import pageMixin from '@/mixins/pageMixin'
    import formMixin from '@/mixins/formMixin'
    import PanelHead from 'components/Common/PanelHead'    

    export default {
        name: 'EuInfo',
        components: {
            PanelHead
        },   
        mixins: [tableMixin, pageMixin, formMixin],
        props: {
            parentData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                formFilters: this.formFiltersInit(),
                tableLoading: false,
                total: 0,
                tableList: [],
                fromRules: {},
                resultList: [
                    { value: 0, label: '全部' },
                    { value: 1, label: '下发成功' },
                    { value: 2, label: '取消成功' },                
                    { value: 999, label: '失败' }                  
                ],
                total: 0,
                panelOpt: {
                    title: this.parentData.name,
                    hasIcon: true
                },
                houseList:  this.parentData.houseList,
                gap: 275
            }
        },
        created(){
            this.getTableList()
        },
        methods: {
            //重置查询条件
            formFiltersInit() {
                return {
                    commandId: this.parentData.commandId,
                    eunNameQuery: '',
                    idcCommandId: this.parentData.idcCommandId,
                    resultCodeQuery: '',
                    serviceCodeQuery: ''
                }
            },
            //查询
            searchEvt() {
                this.getTableList()
            },  
            czEvt() {
                this.formFilters = this.formFiltersInit()
            }, 
            backHandle() {
                this.$emit('removeTab', this.parentData.name)
            },          
            //获取列表数据
            getTableList() {
                this.tableLoading = true
                const params = {...this.formFilters, ...this.pageFilters}
                getNoFilterEuList(params).then(res => {
                    if (res.status === 'success') {
                        this.tableList = res.message.rows
                        this.total = res.message.total
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
}
</style>
