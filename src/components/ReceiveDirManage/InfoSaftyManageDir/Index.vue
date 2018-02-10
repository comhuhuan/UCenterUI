<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="机房名称：" prop="serviceCodeQuery">
					<el-select size="mini" v-model="fromFilters.serviceCodeQuery" placeholder="请选择机房名称">
					    <el-option
					      v-for="item in serviceCodeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				</el-form-item>	
					<el-form-item label="指令类型：" prop="commandTypeQuery">
					<el-select size="mini" v-model="fromFilters.commandTypeQuery" placeholder="请选择指令类型">
					    <el-option
					      v-for="item in cmdTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="生成时间：" prop="createDateQuery">
					<el-date-picker
				      v-model="fromFilters.createDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
					<el-form-item label="下发状态：" prop="excStateQuery">
					<el-select size="mini" v-model="fromFilters.excStateQuery" placeholder="请选择下发状态">
					    <el-option
					      v-for="item in excStateList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>		
					<el-button type="primary" @click="searchEvt">搜索</el-button>
					<el-button type="default" @click="czEvt">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="parting-line"></div>
			<el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
			  <el-table :data="tableList" border :loading="isLoading" @expand-change="rowExpandChange" :expand-row-keys="expands" :row-key="getRowKeys">
			 	<el-table-column type="expand">
                    <template slot-scope="props" v-if="expandAjaxFlag">
                        <el-form label-position="left" inline>
                            <el-form-item label="指令文件序号">
                                <span>{{ expandAjaxData.idcCommandId }}</span>
                            </el-form-item>
                            <el-form-item label="管理指令ID">
                                <span>{{ expandAjaxData.commandId }}</span>
                            </el-form-item>
                            <el-form-item label="指令类型">
                                <span>{{ expandAjaxData.commandType }}</span>
                            </el-form-item>
                            <el-form-item label="下发场所">
                                <span>{{ expandAjaxData.serviceName }}</span>
                            </el-form-item>
                            <el-form-item label="规则类型及内容">
                                <span>{{ expandAjaxData.subType }}</span>
                            </el-form-item>
                            <el-form-item label="执行状态">
                                <span>{{ expandAjaxData.excState }}</span>
                            </el-form-item>
                            <el-form-item label="执行时间">
                                <span>{{ expandAjaxData.excTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>

			    <el-table-column label="管理指令文件序号" prop="idcCommandId"></el-table-column>
			    <el-table-column label="管理指令ID" prop="commandId"></el-table-column>
			    <el-table-column label="管理指令类型" prop="cmdType">
			    	<template slot-scope="scope">
                        <!--指令类型1=监测指令；2=过滤指令；3=病毒指令-->
                        <span v-if="scope.row.cmdType === 1">监测指令</span>
                        <span v-if="scope.row.cmdType === 2">过滤指令</span>
                        <span v-if="scope.row.cmdType === 3">病毒指令</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="生成时间" prop="createTime"></el-table-column>
			    <el-table-column label="执行状态" prop="excState">
			    	<template slot-scope="scope">
                        <!--正在处理（blue）；处理成功（green）；部分处理成功（red）； 处理失败（red）；-->
                      	<el-tag size="mini" type="blue" v-if="scope.row.excState === 1">正在处理</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.excState === 2">处理成功</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.excState === 3">处理失败</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.excState === 4">部分处理成功</el-tag>
                    </template>
			    </el-table-column>
			    <el-table-column label="执行时间" prop="excTime"></el-table-column>
			    
			    <el-table-column label="下发用户">
			    	<template slot-scope="scope">
			    		{{scope.row.owner}}
			    		<span :class="scope.row.visible === 1 ? 'red' : 'green'">{{scope.row.visible === 1 ? '[不可读]' : '[可读]'}}</span>
                    </template>
			    </el-table-column>
		       	<el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small">已过期</el-button>
                    </template>
                </el-table-column>
			</el-table>
			<el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
		</el-tab-pane>
		<el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
			<keep-alive>
				<component :is="tab.component"></component>
			</keep-alive>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import { getInfoSaftyManageDirList,getInfoSaftyManageDirDetail,getInfoSaftyManageDirSelect } from 'api/wbj/infoSaftyManageDir'
	
	export default {
		name: 'InfoSaftyManageDir',
		data() {
			return {
				fromFilters: this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				cmdTypeList:[],
				excStateList:[],
				getRowKeys (row) {
               		 return row['commandId']
            	},
				expands: [],
            	expandAjaxFlag: false,
            	expandAjaxData:{},
				total:0,
				totalPageCount:0,
				isLoading: false,
				tabs_list: [],
				activeName: '当前页'
			}
		},
		created() {
			this.getList()
			this.selectEvt()
		},
		methods: {
		//查询
        searchEvt() {
            this.getList()
        },
        //重置
        fromFiltersInit() {
            return {
					serviceCodeQuery: '',
					commandTypeQuery: '',
					createDateQuery: '',
					excStateQuery: '',
					pageIndex:1,
					pageSize:10
            }
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
        czEvt() {
              this.fromFilters = this.fromFiltersInit()
            },
        //下拉框
        selectEvt(){
        	getInfoSaftyManageDirSelect().then(res => {
                if (res.status === 'success') {
                    this.serviceCodeList = res.message.serviceCodeList
                    this.cmdTypeList = res.message.cmdTypeList
                    this.excStateList = res.message.excStateList
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
			getList() {
				this.isLoading = true
				getInfoSaftyManageDirList(this.fromFilters).then( res => {
					if(res.status === 'success') {
						this.tableList = res.message.rows
						this.total=res.message.total
						this.totalPageCount=res.message.totalPageCount
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
			rowExpandChange(row, expandedRows) {
            if(this.expands[0] !== row['commandId']) {
                getInfoSaftyManageDirDetail({commandId:row['commandId']}).then(res => {
                    if (res.status === 'success') {
                        this.expands = []
                        this.expands.push(row['commandId'])
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
		}
	}

</script>

<style lang="less" scoped>
	.el-select, .el-input {
		width: 165px;
	}
	.el-tabs {
		height: calc(~'100% - 2px');

		.el-tabs__content {
			padding: 0;
		}
	}
	
</style>