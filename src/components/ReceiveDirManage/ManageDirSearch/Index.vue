<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="生成时间：" prop="startTimeQuery">
					<el-date-picker
				      v-model="fromFilters.createDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
					<el-form-item label="执行状态：" prop="excStateQuery">
					<el-select size="mini" v-model="fromFilters.excStateQuery" placeholder="请选择执行状态">
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
			<el-table :data="tableList" border :loading="isLoading">
			    <el-table-column label="IDC/ISP许可证号" prop="idcID"></el-table-column>
			    <el-table-column label="机房名称" prop="serviceCode"></el-table-column>
			    <el-table-column label="查询指令ID" prop="commandID"></el-table-column>
			    <el-table-column label="生成时间" prop="timeStamp"></el-table-column>
			    <el-table-column label="执行状态" prop="excState">
			    		<template slot-scope="scope">
                        <!--执行状态 1-等待处理，2-正在处理，3-处理成功，4-处理失败-->
                        <el-tag size="mini"type="info" v-if="scope.row.excState === 1">等待处理</el-tag>
                        <el-tag size="mini" type="blue" v-if="scope.row.excState === 2">正在处理</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.excState === 3">处理成功</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.excState === 4">处理失败</el-tag>
                    </template>
			    </el-table-column>
			    <el-table-column label="执行时间" prop="excTime"></el-table-column>
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
	import { getManageDirSearchList } from 'api/wbj/manageDirSearch'
	
	export default {
		name: 'ManageDirSearch',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				excStateList:[
					{value: '0', label: '全部'},
					{value: '1', label: '等待处理'},
					{value: '2', label: '正在处理'},
					{value: '3', label: '处理成功'},
					{value: '4', label: '处理失败'}
				],
				tableList: [],
				total:0,
				totalPageCount:0,
				isLoading: false,
				tabs_list: [],
				activeName: '当前页'
			}
		},
		created() {
			this.getList()
		},
		methods: {
		//查询
        searchEvt() {
            this.getList()
        },
        //重置
        fromFiltersInit() {
            return {
					startTimeQuery: '',
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
			getList() {
				this.isLoading = true
				getManageDirSearchList(this.fromFilters).then( res => {
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