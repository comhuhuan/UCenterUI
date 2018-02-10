<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <!--主界面-->
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="经营者名称">
                    <el-input size="mini" v-model="fromFilters.nameQuery"></el-input>
                </el-form-item>
                <el-form-item label="IDC/ISP许可证号">
                    <el-input size="mini" v-model="fromFilters.idcIdQuery"></el-input>
                </el-form-item>
                <el-form-item label="企业法人">
                    <el-input size="mini" v-model="fromFilters.corpQuery"></el-input>
                </el-form-item>
                <el-form-item label="是否上报：" prop="isReportQuery">
                    <el-select size="mini" v-model="fromFilters.isReport" placeholder="请选择是否上报">
                        <el-option v-for="item in reportList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvt">搜索</el-button>
                    <el-button type="default" @click="czEvt">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="parting-line"></div>
            <el-button-group style="margin-top:10px;margin-bottom: 10px;">
                <el-button type="primary" icon="el-icon-plus" @click="commonBtnEvt('新增')">新增</el-button>
                <el-button type="primary" icon="el-icon-sold-out" @click="commonBtnEvt('导入')">导入</el-button>
                <el-button type="primary" icon="el-icon-download" @click="commonBtnEvt('导出')">导出</el-button>
            </el-button-group>
            <el-pagination style="float: right; margin-top: 10px;margin-bottom: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
            <el-table :data="tableList" border :loading="isLoading" @expand-change="rowExpandChange" :expand-row-keys="expands" :row-key="getRowKeys">
                <el-table-column type="expand">
                    <template slot-scope="props" v-if="expandAjaxFlag">
                        <el-form inline>
                            <el-form-item label="邮政编号：">{{props.row.idcZip}}</el-form-item>
                            <el-form-item label="节点数量：">{{props.row.idcispNum}}</el-form-item>
                            <el-form-item label="上报原因：">{{props.row.msg}}</el-form-item>
                            <el-form-item label="生成时间：">{{props.row.generateTime}}</el-form-item>
                            <el-form-item label="应急联系人信息-Email地址：">{{expandAjaxData.emerEmail}}</el-form-item>
                            <el-form-item label="应急联系人信息-证件号码：">{{expandAjaxData.emerIdenNum}}</el-form-item>
                            <el-form-item label="应急联系人信息-证件类型：">{{getIdenType(expandAjaxData.emerIdenType)}}</el-form-item>
                            <el-form-item label="应急联系人信息-手机号码：">{{expandAjaxData.emerMobile}}</el-form-item>
                            <el-form-item label="应急联系人信息-固定电话：">{{expandAjaxData.emerTel}}</el-form-item>
                            <el-form-item label="	网络信息安全责任人-Email地址：">{{expandAjaxData.officerEmail}}</el-form-item>
                            <el-form-item label="网络信息安全责任人-证件号码：">{{expandAjaxData.officerIdenNum}}</el-form-item>
                            <el-form-item label="网络信息安全责任人-证件类型：">{{getIdenType(expandAjaxData.officerIdenType)}}</el-form-item>
                            <el-form-item label="网络信息安全责任人-手机号码：">{{expandAjaxData.officerMobile}}</el-form-item>
                            <el-form-item label="网络信息安全责任人-固定电话：">{{expandAjaxData.officerTel}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="IDC/ISP许可证号" prop="idcId" show-overflow-tooltip></el-table-column>
                <el-table-column label="经营者名称" prop="idcName"></el-table-column>
                <el-table-column label="企业法人" prop="corp"></el-table-column>
                <el-table-column label="安全责任人" prop="idcOfficer"></el-table-column>
                <el-table-column label="经营者地址" prop="idcAdd"></el-table-column>
                <el-table-column label="应急联系人" prop="emerContact"></el-table-column>
                <el-table-column label="是否上报" prop="isReport">
                    <template slot-scope="scope">
                        <el-tag size="mini" :type="scope.row.isReport === 0 ? 'primary' : 'danger'">
                            {{ scope.row.isReport === 0 ? '已上报' : '未上报' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="110">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="editEvt(scope)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @cancelTab="cancelTab" :tabName="activeName" :params="params"></component>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import storage from 'utils/storage'
    import { getIdcOperatorList, showIdcOperatorDetail, removeIdcOperator, findIdenTypeById } from 'api/xiajun/basicDataManage'
    import Add from './Add'
    import Import from './Import'
    import Export from './Export'
    import Edit from './Edit'

    export default {
        name: 'IdcOperator',
        data () {
        return {
            fromFilters: this.fromFiltersInit(),
            fromRules: {},
            params:{},
            reportList: [
                { value: '0', label: '全部' },
                { value: '1', label: '已上报' },
                { value: '2', label: '未上报' },
            ],
            idenTypeList: {
                0: '全部'
            },
            getRowKeys (row) {
                return row['idcId']
            },
            expands: [],
            expandAjaxFlag: false,
            expandAjaxData:{},
            total:0,
            totalPageCount:0,
            tableList: [],
            isLoading: false,
            tabs_list: [],
            activeName: '主页',
        }
    },
    created () {
        this.isLoading = true
        findIdenTypeById({}).then(res => {
            if (res.state === 'success'){
                let idenObj = {}
                res.message.forEach( item => {
                    idenObj[item.idenTypeId] = item.idenTypeName
                })
                Object.assign(this.idenTypeList, idenObj)
                console.log(this.idenTypeList)
                this.getList()
            }else{
                this.$message({
                    type: 'error',
                    message: '请求不成功',
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
    methods: {
        getIdenType(val) {
            return this.idenTypeList[val]
        },
        //查询
        searchEvt() {
            this.getList()
        },
        //重置
        fromFiltersInit() {
            return {
                nameQuery: '',
                idcIdQuery: '',
                corpQuery:'',
                isReportQuery: '',
                pageIndex: 1,
                pageSize: 10
            }
        },
        rowExpandChange(row, expandedRows) {
            if(this.expands[0] !== row['idcId']) {
                showIdcOperatorDetail({idcId:row['idcId']}).then(res => {
                    if (res.state === 'success') {
                        this.expands = []
                        this.expands.push(row['idcId'])
                        this.expandAjaxFlag = true
                        this.expandAjaxData = res['message']
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
                    this.isLoading = false
                })

            } else {
                this.expands = []
                this.expandAjaxFlag = false
            }
        },
        czEvt() {
            this.fromFilters = this.fromFiltersInit()
        },
        getList () {
            this.isLoading = true
            getIdcOperatorList(this.fromFilters).then(res => {
                if (res.state === 'success') {
                    this.tableList = res.message.rows
                    this.total = res.message.total
                    this.totalPageCount = res.message.totalPageCount
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
        handleDelete (index, row) {
            this.$confirm('您确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isLoading = true
                removeIdcOperator({deleteIds:row.idcId}).then(res => {
                    if (res.state === 'success'){
                        this.$message({
                            type: 'success',
                            message: res.message,
                            showClose: true,
                        })
                        this.getList()
                    }else if (res.state === 'error'){
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true,
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '请求不成功',
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSizeChange(val) {
            this.fromFilters.pageSize = val
            this.fromFilters.pageIndex = 1
            this.getList()
        },
        handleCurrentChange(val) {
            this.fromFilters.pageIndex = val
            this.getList()
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
                    case '新增':
                        Object.assign(componentObj,{component: Add})
                        break;
                    case '导入':
                        Object.assign(componentObj,{component: Import})
                        break;
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
        editEvt(scope) {
            let rowNum = scope.$index + 1
            let name = '行' + rowNum + '-修改'
            let exist = false,newEdit = false,preName = ''
            this.tabs_list.some(item => {
                if (item.name === name) {
                    exist = true
                }
                if (item.name.indexOf('修改') > -1) {
                    newEdit = true
                    preName = item.name
                }
                return false
            })
            if (!exist){
                if (newEdit){
                    this.tabs_list.forEach( item => {
                        if (item.name === preName){
                            item.name = name
                            this.params = scope.row
                            item.component = Edit
                        }
                    })
                }else{
                    this.params = scope.row
                    this.tabs_list.push({
                        name:name,
                        component: Edit
                    })
                }
            }
            this.activeName = name
        }
    }
    }
</script>

<style lang="less">
    fieldset {
        border: 1px solid #c7c7c7;
        padding: 10px 10px 10px 10px;
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
