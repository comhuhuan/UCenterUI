<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="姓名：" prop="nameQuery">
                    <el-input  size="mini" v-model="fromFilters.nameQuery" placeholder="查询责任人姓名"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：" prop="idenTypeQuery">
                    <el-select size="mini" v-model="fromFilters.idenTypeQuery" placeholder="请选择">
                        <el-option
                            v-for="(value, key) in idenTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码：" prop="idenNumQuery">
                    <el-input  size="mini" v-model="fromFilters.idenNumQuery" placeholder="查询责任人证件号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="default">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="parting-line"></div>
            <el-button-group style="margin-top:10px;margin-bottom: 10px;">
                <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增')">新增</el-button>
                <el-button type="primary" :disabled="batchDelDisabled" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
            </el-button-group>
            <el-pagination style="float: right; margin-top: 10px;margin-bottom: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
            <el-table :data="tableList" border :loading="isLoading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="证件类型" prop="idenTypeId">
                    <template slot-scope="scope">
                        {{idenTypeList[scope.row.idenTypeId]}}
                    </template>
                </el-table-column>
                <el-table-column label="证件号码" prop="idenNum"></el-table-column>
                <el-table-column label="固定电话" prop="tel"></el-table-column>
                <el-table-column label="移动电话" prop="mobile"></el-table-column>
                <el-table-column label="Email地址" prop="email"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editEvt(scope)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @cancelTab="cancelTab" :tabName="activeName" :params="params" :myIdenTypeList="idenTypeList"></component>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { getDutyOfficerList, findIdenTypeById, removeDutyOfficer } from 'api/xiajun/basicDataManage'
    import Add from './Add'
    import Edit from './Edit'

    export default {
        name: 'DutyOfficerManage',
        data() {
            return {
                fromFilters: this.fromFiltersInit(),
                batchDelDisabled: true,
                fromRules: {},
                params:{},
                idenTypeList: {
                    0: '全部'
                },
                selectIds:[],
                tableList: [],
                total:0,
                totalPageCount:0,
                tabs_list: [],
                activeName:'主页',
                isLoading: false,
            }
        },
        created() {
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
            handleSizeChange(val) {
                this.fromFilters.pageSize = val
                this.fromFilters.pageIndex = 1
                this.getList()
            },
            handleCurrentChange(val) {
                this.fromFilters.pageIndex = val
                this.getList()
            },
            fromFiltersInit() {
                return {
                    nameQuery: '',
                    idenTypeQuery: '',
                    idenNumQuery: '',
                    pageIndex: 1,
                    pageSize: 10
                }
            },
            handleDelete (index, row) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isLoading = true
                    removeDutyOfficer({deleteIds:row.id}).then(res => {
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
            batchDelete () {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isLoading = true
                    removeDutyOfficer({deleteIds:this.selectIds.join(',')}).then(res => {
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
            cancelTab(tabName) {
                console.log('cancelTab',tabName)
                console.log('activeName',this.activeName)
                const newTabs = []
                this.tabs_list.forEach( item => {
                    if(item.name !== tabName){
                        newTabs.push(item)
                    }
                })
                this.activeName = '主页'
                this.tabs_list = newTabs
            },
            handleSelectionChange(val) {
                console.log('handleSelectionChange',val)
                val.forEach(item => {
                    this.selectIds.push(item.id)
                })
                if (val.length > 0){
                    this.batchDelDisabled = false
                }else{
                    this.batchDelDisabled = true
                }
            },
            addEvt(val) {
                let exist = false
                this.tabs_list.some(item => {
                    if (item.name === val) {
                        exist = true
                        return true
                    }
                    return false
                })
                if (!exist){
                    this.tabs_list.push({
                        name:val,
                        component: Add
                    })
                }
                this.activeName = val
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
            getList() {
                this.isLoading = true
                getDutyOfficerList(this.fromFilters).then( res => {
                  if (res.state === 'success'){
                      this.tableList = res.message.rows
                      this.total = res.message.total
                      this.totalPageCount = res.message.totalPageCount
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true
                    })
                  }
                  this.isLoading = false
                }).catch( err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
                    this.isLoading = false
                })
            }
        }
    }

</script>

<style lang="less">

</style>
