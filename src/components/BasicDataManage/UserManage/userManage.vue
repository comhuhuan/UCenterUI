<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="机房名称：">
                    <el-select size="mini" v-model="fromFilters.houseCodeQuery" placeholder="请选择机房名称">
                        <el-option v-for="item in houseList" :key="item.houseCode" :label="item.houseName" :value="item.houseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位名称：" >
                    <el-input size="mini" v-model="fromFilters.nameQuery" placeholder="请输入单位名称"></el-input>
                </el-form-item>
                <el-form-item label="单位属性：">
                    <el-select size="mini" v-model="fromFilters.kindIdQuery" placeholder="请选择单位属性">
                        <el-option v-for="item in sxList" :key="item.kindId" :label="item.kindName" :value="item.kindId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件类型：">
                    <el-select size="mini" v-model="fromFilters.IDtypeQuery" placeholder="请选择证件类型">
                        <el-option v-for="item in cardList" :key="item.idenTypeId" :label="item.idenTypeName" :value="item.idenTypeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvt">搜索</el-button>
                    <el-button type="default" @click="czEvt">重置</el-button>
                </el-form-item>

                <div class="more-filter" v-if="isShowMoreFilter">
                    <el-form-item label="证件号码：">
                        <el-input size="mini" v-model="fromFilters.IDNumberQuery" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="单位地址：">
                        <el-input size="mini" v-model="fromFilters.addrQuery" placeholder="请输入单位地址"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型：">
                        <el-select size="mini" v-model="fromFilters.userTypeQuery" placeholder="请选择用户类型">
                            <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否上报：">
                        <el-select size="mini" v-model="fromFilters.isReportQuery" placeholder="请选择是否上报">
                            <el-option v-for="item in reportList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="more-btn">
                    <i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
                </div>
            </el-form>
            <div class="parting-line"></div>
            <div class="btn-line">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增')">新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" :disabled="allDel" @click="handleDelete(deleteIds)">批量删除</el-button>
                    <el-button type="primary" icon="el-icon-sold-out" @click="addEvt('导入')">导入</el-button>
                    <el-button type="primary" icon="el-icon-download" @click="addEvt('导出')">导出</el-button>
                </el-button-group>
                <el-pagination style="float: right;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
                </el-pagination>
            </div>
            <el-table :max-height="tableMaxHeight" :data="tableList" border v-loading="isLoading" :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="toggleRowExpansion" @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="证件号码">
                                <span>{{ props.row.detailData.IDNumber }}</span>
                            </el-form-item>
                            <el-form-item label="证件类型">
                                <span>{{ props.row.detailData.IDtype }}</span>
                            </el-form-item>
                            <el-form-item label="单位地址">
                                <span>{{ props.row.detailData.addr }}</span>
                            </el-form-item>
                            <el-form-item label="email地址">
                                <span>{{ props.row.detailData.email }}</span>
                            </el-form-item>
                            <el-form-item label="用户所属经营者Id">
                                <span>{{ props.row.detailData.idcId }}</span>
                            </el-form-item>
                            <el-form-item label="单位属性">
                                <span>{{ props.row.detailData.kindId }}</span>
                            </el-form-item>
                            <el-form-item label="移动电话">
                                <span>{{ props.row.detailData.mobile }}</span>
                            </el-form-item>
                            <el-form-item label="单位名称">
                                <span>{{ props.row.detailData.name }}</span>
                            </el-form-item>
                            <el-form-item label="安全责任人">
                                <span>{{ props.row.detailData.officerId }}</span>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <span>{{ props.row.detailData.registerTime }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.detailData.remark }}</span>
                            </el-form-item>
                            <el-form-item label="固定电话">
                                <span>{{ props.row.detailData.tel }}</span>
                            </el-form-item>
                            <el-form-item label="用户ID">
                                <span>{{ props.row.detailData.useId }}</span>
                            </el-form-item>
                            <el-form-item label="用户属性">
                                <span>{{ props.row.detailData.userType }}</span>
                            </el-form-item>
                            <el-form-item label="邮政编码">
                                <span>{{ props.row.detailData.useId }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="IDC/ISP许可证号" prop="idcId"></el-table-column>
                <el-table-column label="单位名称" prop="name"></el-table-column>
                <el-table-column label="用户类型" prop="userType">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userType === 1">提供应用服务用户</span>
                        <span v-if="scope.row.userType === 2">其它用户</span>
                    </template>
                </el-table-column>
                <el-table-column label="单位属性" prop="kindId"></el-table-column>
                <el-table-column label="安全责任人" prop="officerId"></el-table-column>
                <el-table-column label="注册时间" prop="registerTime"></el-table-column>
                <el-table-column label="是否上报" prop="isReport">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isReport === 1">否</span>
                        <span v-if="scope.row.isReport === 2">是</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editEvt(scope)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small" @click="handleDelete(scope.row.idcId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @saveQuit="saveQuit"></component>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>
<script>

import { getUserManageList, getUserManageDel, getUserManageDetail,houseList,comList,cardList } from 'api/dxq/UserManage'
import storage from 'utils/storage'
import Add from './Add'
import Mixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'   //分页
import Import from './Import'
import Export from './Export'
import { mapActions } from 'vuex'
export default {
    name: 'UserManage',
    mixins: [Mixin,pageMixin],
    data () {
        return {
            getRowKeys (row) {
                return row['idcId']
            },
            expandsKey: 'idcId',
            detailsIsLoading: true,
            allDel: true,
            deleteIds: '',
            fromFilters: this.fromFiltersInit(),
            fromRules: {},
            houseList: [],
            sxList:[],
            cardList:[],
            userList: [
            { value: 1, label: '提供应用服务的用户' },
            { value: 2, label: '其它用户' },
            ],
            reportList: [
            { value: 0, label: '已上报' },
            { value: 1, label: '未上报' },
             ],
            tableList: [],
            tabs_list: [],
            isLoading: false,
            total: 100,
            isShowMoreFilter: false,
            gap: 302
        }
    },
    created () {
        // console.log('Mixin', Mixin)
        this.getTableList()
        this.selectEvt()
    },
    watch: {
        isShowMoreFilter(val) {
            this.gap = val ? 349 : 302
            this.setTableHeight()
        }
    },
    methods: {
        ...mapActions([
            'setUserData',
            'setAdd',
            'setEdit',
            'setActive',
            'setIsUser',
            'setStep',
            'setIsServer',
            'setIsRoom'
        ]),
        fromFiltersInit () {
            return {
                userTypeQuery:'',
                IDNumberQuery:'', //证件号码 string
                IDtypeQuery:'', //证件类型 string 下拉框【1.工商营业执照号码；2.身份证；3.组织机构代码证书；4.事业法人证书；5.军队代号；6.社团法人证书；7.护照；8.军官证；9.台胞证；10.其他】涉及到的表：tab_card_type
                addrQuery:'', //单位地址 string
                houseCodeQuery:'', //机房编号 string 根据机房编号获取机房名称
                isReportQuery:'', //是否上报 string 下拉列表【0=已上报,1=未上报】
                kindIdQuery:'', //单位属性 string 下拉列表【1.军队；2.政府机关；3.事业单位；4.企业；5.个人；6.社会团体；7.其他】涉及到的表：res_customer_kind
                nameQuery:'', //单位名称 string
            }
        },
        getTableList () {
            this.isLoading = true
            const params = {...this.fromFilters, ...this.pageFilters}
            getUserManageList(params).then(res => {
                if (res.status === 'success') {
                   // this.tableList = res.message.rows
                    this.tableList = res.message.rows.map(v => {
                        this.$set(v, 'detailData', {})
                        return v
                    })
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
        //详情
        getDetails (row) {
          //  console.log(row)
            const loadingInstance = this.$loading({
                target: '.el-table__expanded-cell'
            })
            getUserManageDetail({ id: row.idcId }).then(res => {
                if (res.status === 'success') {
                    this.tableList.forEach((item,index) => {
                        if (item.id === row.id) {
                            this.tableList[index].detailData = res.message
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                loadingInstance.close()
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '请求不成功',
                    showClose: true,
                })
                loadingInstance.close()
            })
        },
        addEvt (val) {
            this.tabs_list = []
            let exist = false
            this.tabs_list.some(item => {
                if (item.name === val) {
                    exist = true
                    return true
                }
                return false
            })

            if (!exist) {
                if (val == "新增") {
                    this.tabs_list.push({
                        name: val,
                        component: Add
                    })
                    this.setUserData({})
                    this.setAdd(true)
                    this.setEdit(false)
                    this.setActive(1)
                    this.setIsUser(true)
                    this.setIsServer(false)
                    this.setIsRoom(false)
                    this.$emit("tabDis")
                    this.setStep(1)
                } else if (val == "导入") {
                    this.tabs_list.push({
                        name: val,
                        component: Import
                    })
                    this.$emit("tabDis")
                } else if (val == "导出") {
                    this.tabs_list.push({
                        name: val,
                        component: Export
                    })
                    this.$emit("tabDis")
                }
                this.activeName = val
            } else {
                this.activeName = val
                this.$emit("tabDis")
            }
        },
        editEvt(scope) {
            this.tabs_list = []
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
                            item.component = Add

                            this.setAdd(false)
                            this.setEdit(true)
                            this.setActive(1)
                            this.setIsUser(true)
                            this.setIsServer(false)
                            this.setIsRoom(false)
                            this.$emit("tabDis")
                            this.setStep(1)
                            storage.set("user", scope.row)
                        }
                    })
                }else{
                    this.setAdd(false)
                    this.setEdit(true)
                    this.setActive(1)
                    this.setIsUser(true)
                    this.setIsServer(false)
                    this.setIsRoom(false)
                    this.$emit("tabDis")
                    this.setStep(1)
                    storage.set("user", scope.row)

                    this.tabs_list.push({
                        name:name,
                        component: Add
                    })
                }
            }
            this.activeName = name
        },
        tabRemove (tabName) {
            const newTabs = []
            this.tabs_list.forEach(item => {
                if (item.name !== tabName) {
                    newTabs.push(item)
                }
            })
            this.activeName = '主页'
            this.tabs_list = newTabs
            this.$emit("tabShow")
        },
        tabClick (tab) {
            this.activeName = tab.name
            if (tab.name == "主页") {
                this.$emit("tabShow")
            } else {
                this.$emit("tabDis")
            }
        },
        saveQuit () {
            this.activeName = '主页'
            this.tabs_list = []
            this.$emit("tabShow")
            //刷新列表
            this.getTableList()
        },
        handleDelete (params) {
            var par ={deleteIds:params}
            this.$confirm('您确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isLoading = true
                //用户ID  deleteIds
                getUserManageDel(par).then(res => {
                    this.isLoading = false
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: res.status == 'success' ? 'success' : 'error'
                    });
                    if (res.status === 'success') {
                        this.getTableList()
                    }
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
        //批量删除
        handleSelectionChange (val) {
            this.allDel = false
            if(val.length > 0) {
                const ids = []
                val.forEach( item => {
                    ids.push(item.idcId)
                })
                this.deleteIds = ids.join(',')
            }

        },
        //下拉框
        selectEvt(){
            houseList().then(res => {
                if (res.status === 'success') {
                    this.houseList = res.message
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
            comList().then(res => {
                if (res.status === 'success') {
                    this.sxList = res.message
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
            cardList().then(res => {
                if (res.status === 'success') {
                    this.cardList = res.message
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
        //查询
        searchEvt () {
            this.getTableList()
        },
        //重置
        czEvt () {
            this.fromFilters = this.fromFiltersInit()
        },
    }
}
</script>
<style lang="less" scoped>
.el-tabs {
    .el-tabs__content {
        padding: 0;
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
