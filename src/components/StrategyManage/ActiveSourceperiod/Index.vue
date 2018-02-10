<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <!--主界面-->
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="机房名称">
                    <el-select size="mini" v-model="fromFilters.serviceCodeQuery" placeholder="请选择执行状态">
                        <el-option v-for="item in serviceCodeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行状态：" prop="deployModeQuery">
                    <el-select size="mini" v-model="fromFilters.deployModeQuery" placeholder="请选择执行状态">
                        <el-option v-for="item in deployModeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下发时间:">
                    <el-date-picker size="mini" v-model="fromFilters.dateQuery" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="min-width: 280px!important;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvt">搜索</el-button>
                    <el-button type="default" @click="">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="parting-line"></div>
            <el-pagination style="float: right; margin-top: 10px;margin-bottom: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
            <el-table :data="tableList" border :loading="isLoading" @row-click="rowClickEvt">
                <el-table-column label="机房名称" prop="serviceName"></el-table-column>
                <el-table-column label="上报周期" prop="reportTime"></el-table-column>
                <el-table-column label="下发时间" prop="timeStamp"></el-table-column>
                <el-table-column label="下发执行状态" prop="deployMode"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" v-popover:popEdit><i class="el-icon-edit"></i>设置
                            <el-popover
                                ref="popEdit"
                                placement="top"
                                width="320"
                                trigger="click">
                                <h4>设置机房【{{scope.row.serviceName}}】上报周期</h4>
                                <el-form label-width="auto" inline>
                                    <el-form-item label="上报周期">
                                        <el-input-number size="mini" style="width: 160px;" v-model="reportTimeIpt" :min="1">
                                        </el-input-number>
                                    </el-form-item>
                                </el-form>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini"  @click="popCancelEvt">取消</el-button>
                                    <el-button type="primary" size="mini" @click="popOKEvt(scope.row)">确定</el-button>
                                </div>
                            </el-popover>
                        </el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">下发</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { getActiveSourceperiodList, activeResourceInit, setActivePeriod } from 'api/xiajun/strategyManage'
    export default {
        name: 'ActiveSourceperiod',
        data() {
            return {
                reportTimeIpt: 110,
                disabled:false,
                fromRules: {},
                activeName: '主页',
                deployModeList: [
                    { value: '0', label: '全部'},
                    { value: '1', label: '等待下发'},
                    { value: '2', label: '正在下发'},
                    { value: '3', label: '下发成功'},
                    { value: '4', label: '下发失败'}
                ],
                serviceCodeList:[
                    { value: '0', label: '全部'}
                ],
                total:0,
                totalPageCount:0,
                tableList: [],
                isLoading: false,
                fromFilters: this.fromFiltersInit()
            }
        },
        created() {
            this.isLoading = true
            activeResourceInit({}).then(res => {
                if (res.state === 'success'){
                    this.serviceCodeList = [...this.serviceCodeList,...res.message.serviceCodeList]
                    console.log('this.serviceCodeList',this.serviceCodeList)
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
            rowClickEvt(row, evt, column) {
                console.log('rowClickEvt',row,row.reportTime)
                this.reportTimeIpt = row.reportTime
            },
            popCancelEvt() {
                $("#app").trigger('click')
            },
            popOKEvt(row) {
                this.isLoading = true
                const params = {
                    provID:row.provID,
                    serviceCode:row.serviceCode,
                    serviceName:row.serviceName,
                    reportTime:this.reportTimeIpt
                }
                setActivePeriod(params).then(res => {
                    if (res.state === 'success'){
                        this.$message({
                            type: 'success',
                            message: res.message,
                            showClose: true,
                        })
                        $("#app").trigger('click')
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
            //重置
            fromFiltersInit() {
                return {
                    dateQuery: '',
                    userId: 'admin',
                    deployModeQuery:'',
                    serviceCodeQuery: '',
                    pageIndex: 1,
                    pageSize: 10
                }
            },
            //查询
            searchEvt() {
                this.getList()
            },
            getList() {
                this.isLoading = true
                getActiveSourceperiodList(this.fromFilters).then(res => {
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
            }
        }
    }

</script>

<style lang="less">

    .el-date-editor {
        .el-range__icon{
            height: 21px!important;
            line-height: 21px!important;
            font-size: 12px!important;
        }
        .el-range-input {
            font-size: 12px!important;
        }
    }

</style>
