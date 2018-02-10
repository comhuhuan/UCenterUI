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
                    <el-form-item label="网站名称：">
                        <el-input size="mini" v-model="fromFilters.webNameQuery"></el-input>
                    </el-form-item>
                    <el-form-item label="网站IP：">
                        <el-input size="mini" v-model="fromFilters.netIpQuery"></el-input>
                    </el-form-item>
                    <el-form-item label="一级域名：">
                        <el-input size="mini" v-model="fromFilters.topDomainQuery"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchEvt">搜索</el-button>
                        <el-button type="default" @click="czEvt">重置</el-button>
                    </el-form-item>
                    <div class="more-filter" v-if="isShowMoreFilter">
                        <el-form-item label="发现日期：">
                            <el-date-picker size="mini" v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="more-btn">
                        <i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
                    </div>
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
                <el-table-column label="网站名称" prop="netName"></el-table-column>
                <el-table-column label="网站IP" prop="netIp"></el-table-column>
                <el-table-column label="一级域名" prop="topDomain"></el-table-column>
                <el-table-column label="最后活跃时间" prop="activeTime"></el-table-column>
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
    import { lineWebsiteList,lineWebsiteSelect } from 'api/dxq/specialLineJoinSource'
    import tableMixin from '@/mixins/tableMixin'  //表格操作及高度
    import pageMixin from '@/mixins/pageMixin'   //分页
    import Export from './Export'
    import fecha from 'fecha'

    export default {
        name: 'lineWebsite',
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
            isShowMoreFilter:false,
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
                activeEndDateQuery:'',  // 活跃时间结束 string yyyy-MM-dd
                activeStartDateQuery:'' , //  活跃时间起始 string yyyy-MM-dd
                netIpQuery:'',  //  网站IP string
                serviceCodeQuery:'' , //  机房名称 string 【下拉框 {机房/指令来源列表请求获取}】
                topDomainQuery:'',  //  一级域名 string
                webNameQuery:''  //
        }
        },
        czEvt() {
            this.fromFilters = this.fromFiltersInit()
            this.dateRange=[]
        },
        //下拉框
        selectEvt(){
            lineWebsiteSelect().then(res => {
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
                this.fromFilters.activeStartDateQuery = this.dateRange[0] &&fecha.format(this.dateRange[0], 'YYYY-MM-DD')
                this.fromFilters.activeEndDateQuery = this.dateRange[1] &&fecha.format(this.dateRange[1], 'YYYY-MM-DD')
            }
            const params = {...this.fromFilters, ...this.pageFilters}
            lineWebsiteList(params).then(res => {
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
    .el-form {
        transition: all 0.3s linear;

    .more-btn {
        text-align: center;
    i {
        position: relative;
        color: #ccc;
        font-size: 20px;
        animation: upAndDown 1.5s infinite linear alternate;
        transition: all 0.15s linear;

        cursor: pointer;
    &.is-reverse {
         transform: rotate(-180deg);
     }
    &:hover {
         color: #333;
     }
    }
    }
    }
    @keyframes upAndDown {
        from {
            top: -10px;
        }
        to {
            top: 0px;
        }
    }
</style>
