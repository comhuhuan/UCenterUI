<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <!--主界面-->
            <div id="joinSource">
                <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                    <el-form-item label="机房名称：">
                        <el-select size="mini" v-model="fromFilters.serviceCodeQuery" placeholder="请选择机房名称">
                            <el-option v-for="item in serviceCodeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="域名：">
                        <el-input size="mini" v-model="fromFilters.domainQuery"></el-input>
                    </el-form-item>
                    <el-form-item label="封堵状况：">
                        <el-select size="mini" v-model="fromFilters.blockStateQuery" placeholder="请选择封堵状况">
                            <el-option v-for="item in blockStateList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发现日期：">
                        <el-date-picker size="mini" v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchEvt">搜索</el-button>
                        <el-button type="default" @click="czEvt">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="parting-line"></div>
            <div class="btn-line">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-download" @click="commonBtnEvt('导出')">导出</el-button>
                </el-button-group>
                <el-pagination style="float: right;"
                               @size-change="handleSizeChange"
                               :current-page.sync="pageFilters.pageIndex"
                               :page-size="pageFilters.pageSize"
                               layout="total, sizes"
                               :total="total">
                </el-pagination>
            </div>

            <el-table :data="tableList" border :loading="isLoading" :max-height="tableMaxHeight">
                <el-table-column label="机房名称" prop="serviceName"></el-table-column>
                <el-table-column label="域名" prop="serviceCode"></el-table-column>
                <el-table-column label="备案状态" prop="recordState">
                    <template slot-scope="scope">
                        <!--备案状态 number 0=审核中（#0080c0）；1=未备案（#ff0000）；2=已备案（#008080）；3=异常（#7c7c7c）-->
                        <el-tag size="mini" v-if="scope.row.recordState === 0">审核中</el-tag>
                        <el-tag size="mini" type="info" v-if="scope.row.recordState === 1">未备案</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.recordState === 2">已备案</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.recordState === 3">异常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发现时间" prop="createTime"></el-table-column>
                <el-table-column label="最后活跃时间" prop="lastActivetime"></el-table-column>
                <!--<el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detailEvt(scope)">详情</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <el-pagination style="float: right; margin-top: 10px;"
                           @current-change="handleCurrentChange"
                           :current-page.sync="pageFilters.pageIndex"
                           :page-size="pageFilters.pageSize"
                           layout="prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @cancelTab="cancelTab" :params="params" :tabName="activeName"></component>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import storage from 'utils/storage'
    import { lineDomainRecordList,lineDomainRecordSelect } from 'api/dxq/specialLineJoinSource'
    import tableMixin from '@/mixins/tableMixin'  //表格操作及高度
    import pageMixin from '@/mixins/pageMixin'   //分页
    import Export from './Export'
    import fecha from 'fecha'

    export default {
        name: 'lineDomainRecord',
        mixins: [tableMixin, pageMixin],
        data () {
        return {
            fromFilters: this.fromFiltersInit(),
            fromRules: {},
            params:{},
            blockStateList: [],
            serviceCodeList:[],
            tableList: [],
            isLoading: false,
            tabs_list: [],
            dateRange:[],
            gap: 252
        }
    },
    created () {
        this.getTableList()
        this.selectEvt()
    },
    methods: {
        //查询
        searchEvt() {
            this.getTableList()
        },
        //重置
        fromFiltersInit() {
            return {
                blockStateQuery:'',// 封堵状况 number 【下拉框{1=已封堵,0=未封堵}】
                domainQuery:'',//  域名 string
                findEndDateQuery:'',//  发现终止时间 string yyyy-MM-dd
                findStartDateQuery:'',//  发现起始时间 string yyyy-MM-dd
                serviceCodeQuery:'',//
            }
        },
        czEvt() {
            this.fromFilters = this.fromFiltersInit()
            this.dateRange=[]
        },
        //下拉框
        selectEvt(){
            lineDomainRecordSelect().then(res => {
                if (res.status === 'success') {
                    this.blockStateList = res.message.blockStateList
                    this.serviceCodeList = res.message.serviceCodeList
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '请求不成功',
                    showClose: true,
                })
            })
        },
        getTableList () {
            this.isLoading = true
            if (this.dateRange && this.dateRange.length > 0) {
                this.fromFilters.findStartDateQuery = this.dateRange[0] &&fecha.format(this.dateRange[0], 'YYYY-MM-DD')
                this.fromFilters.findEndDateQuery = this.dateRange[1] &&fecha.format(this.dateRange[1], 'YYYY-MM-DD')
            }
            const params = {...this.fromFilters, ...this.pageFilters}
            lineDomainRecordList(params).then(res => {
                if (res.state === 'success') {
                    this.tableList = res.message.rows
                    this.total = res.message.total
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.isLoading = false
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '请求不成功',
                    showClose: true,
                })
                this.isLoading = false
            })
        },
        tabRemove(tabName){
            const newTabs = []
            this.tabs_list.forEach( item => {
                if(item.name !== tabName){
                    newTabs.push(item)
                }
            })
            this.activeName = '主页'
            this.tabs_list = newTabs
        },
        tabClick(tab) {
            console.log('tabClick',tab)
            console.log('tabClick',tab.name)
            this.activeName = tab.name
        },
        commonBtnEvt(val) {
            let exist = false
            this.tabs_list.some(item => {
                if (item.name === val) {
                    exist = true
                    return true
                }
                return false
            })
            if (!exist){
                let componentObj = {name: val}
                switch (val){
                    case '导出':
                        Object.assign(componentObj,{component: Export})
                        break;
                }
                this.tabs_list.push(componentObj)
            }
            this.activeName = val
        },
        cancelTab(tabName) {
            const newTabs = []
            this.tabs_list.forEach( item => {
                if(item.name !== tabName){
                    newTabs.push(item)
                }
            })
            this.activeName = '主页'
            this.tabs_list = newTabs
        },
    }
    }
</script>

<style lang="less">
    #joinSource{
    .el-form.el-form--inline .el-date-editor{
        width: 280px!important;
    }
    }
    fieldset {
        border: 1px solid #c7c7c7;
        padding: 10px 10px 0px 10px;
        overflow: hidden;
        transition: all 0.3s ease;
    legend {
        border: none;
        width: auto;
        font-size: 14px;
        padding: 0 5px;
        cursor: pointer;
        color: #999999;
        margin: 0;
    }
    }
</style>
