<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="机房名称：" prop="houseName">
                    <el-select v-model="fromFilters.houseName" placeholder="请选择机房名称">
                        <el-option
                            v-for="item in houseList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户：" prop="userName">
                    <el-input v-model="fromFilters.userName" placeholder="请输入用户"></el-input>
                </el-form-item>
                <el-form-item label="所属机架：" prop="jiJia">
                    <el-input v-model="fromFilters.jiJia" placeholder="请输入所属机架"></el-input>
                </el-form-item>
                <el-form-item label="服务ID：" prop="serviceID">
                    <el-input v-model="fromFilters.serviceID" placeholder="请输入服务ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="default">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableList" border :loading="isLoading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="机房名称：">
                                <span>{{ props.row.houseName }}</span>
                            </el-form-item>
                            <el-form-item label="单位名称：">
                                <span>{{ props.row.orgName }}</span>
                            </el-form-item>
                            <el-form-item label="接入方式：">
                                <span>{{  props.row.accessWay === 0 ? '虚拟主机' : '物理主机' }}</span>
                            </el-form-item>
                            <el-form-item label="服务ID：">
                                <span>{{ props.row.serviceID }}</span>
                            </el-form-item>
                            <el-form-item label="分配时间：">
                                <span>{{ props.row.allocateTime }}</span>
                            </el-form-item>
                            <el-form-item label="备案码：">
                                <span>{{ props.row.allocateTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="机房名称" prop="houseName"></el-table-column>
                <el-table-column label="单位名称" prop="orgName"></el-table-column>
                <el-table-column label="服务ID" prop="serviceID"></el-table-column>
                <el-table-column label="服务内容" prop="serviceContent"></el-table-column>
                <el-table-column label="接入方式" prop="accessWay">
                    <template slot-scope="scope">
                        <el-tag size="mini" :type="scope.row.accessWay === 0 ? 'error' : 'primary'">{{ scope.row.accessWay === 0 ? '虚拟主机' : '物理主机' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="分配时间" prop="allocateTime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addEvt(scope.row)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-button-group style="margin-top:10px;">
                <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增')">新增</el-button>
                <el-button type="primary" disabled icon="el-icon-delete" @click="">批量删除</el-button>
            </el-button-group>
            <el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageNo" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>

        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @cancelClick="cancelEvt"></component>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { getTakeUpRoomList } from 'api/xiajun/basicDataManage'
    import storage from 'utils/storage'
    import Add from './Add'
    import Edit from './Edit'

    export default {
        name: 'TakeUpRoom',
        data() {
            return {
                fromFilters: this.fromFiltersInit(),
                fromRules: {},
                houseList: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '机房1'},
                    {value: '2', label: '机房2'},
                    {value: '3', label: '机房3'},
                    {value: '4', label: '机房4'},
                ],
                tableList: [],
                tabs_list: [],
                activeName:'主页',
                isLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            fromFiltersInit() {
                return {
                    houseName: '',
                    userName: '',
                    jiJia: '',
                    serviceID: '',
                    serviceContent: '',
                    accessWay: '',
                    allocateTime: '',
                    orgName:'',
                    page_size: '',
                    pageNo: 1
                }
            },
            getList() {
                this.isLoading = true
                getTakeUpRoomList(this.fromFilters).then( res => {
                    if(res.state === 'success') {
                        this.tableList = res.message
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true,
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
            },
            addEvt (val) {
                console.log(val)
                let name
                if(val.serviceID){
                    name = val.serviceID + "--修改"
//                    storage.set('editData', val)
                }else{
                    name = val
                }
                console.log(name)
                let exist = false
                this.tabs_list.some(item => {
                    //	console.log(item)
                    if (item.name === name) {
                        exist = true
                        this.activeName = name
                        return true
                    }
                    return false
                })

                if (!exist) {
                    this.tabs_list.push({
                        name,
                        component:Add
                    })
                    // console.log(this.tabs_list)
                    if(name == "新增"){
                        this.tabs_list[0].component = Add
                    }else if(name.indexOf("修改")>-1){
                        console.log('modify')
                        this.tabs_list[0].component = Edit
                    }
                    this.activeName = name
                }
            },
            //一页显示多少条
            handleSizeChange (val) {
                this.fromFilters.page_size = val;
                this.handleCurrentChange(1);
            },
            cancelEvt(){
                this.activeName = '主页'
                this.tabs_list=[]
            },
            handleDelete (index, row) {
                this.$confirm('您确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //上下页
            handleCurrentChange (val) {
                this.fromFilters.pageNo = val;
                this.getList();
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-tabs {
        .el-tabs__content {
            padding: 0;
        }
    }
</style>
