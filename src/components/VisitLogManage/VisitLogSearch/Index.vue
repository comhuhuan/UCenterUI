<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="查询条件：" prop="searchConditionQuery">
					<el-input size="mini" v-model="fromFilters.searchConditionQuery" placeholder="请输入查询条件"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="stateQuery">
					<el-select size="mini" v-model="fromFilters.stateQuery" placeholder="请选择状态">
					    <el-option
					      v-for="item in stateList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开始时间：" prop="startTimeQuery">
					<el-date-picker
				      v-model="fromFilters.startTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="结束时间：" prop="endTimeQuery">
					<el-date-picker
				      v-model="fromFilters.endTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
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
			    <el-table-column label="下发机房" prop="serviceName"></el-table-column>
			    <el-table-column label="指令名称" prop="commadName"></el-table-column>
			    <el-table-column label="查询时间范围" prop="searchtime"></el-table-column>
			    <el-table-column label="查询条件" prop="condition"></el-table-column>
			    <el-table-column label="生成时间" prop="timeStamp"></el-table-column>
			    <el-table-column label="下发状态" prop="state">
			    	<template slot-scope="scope">
			    	  	<!--下发状态 1-待下发，2-下发成功，3-上传成功，4-下发失败，5-部分下发成功-->
                        <span v-if="scope.row.state === '1'">待下发</span>
                        <span v-if="scope.row.state=== '2'">下发成功</span>
                        <span v-if="scope.row.state=== '3'">上传成功</span>
                        <span v-if="scope.row.state=== '4'">下发失败</span>
                        <span v-if="scope.row.state=== '5'">部分下发成功</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="操作" prop="operateType"></el-table-column>
			    <el-table-column label="详情" prop="detailOperate"></el-table-column>
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
	import { getVisitLogSearchList } from 'api/wbj/visitLogSearch'
	
	export default {
		name: 'VisitLogSearch',
		data() {
			return {
				fromFilters: this.fromFiltersInit(),
				fromRules: {
					
				},
				stateList: [
					{value: '1', label: '待下发'},
					{value: '2', label: '已下发'},
					{value: '3', label: '上传成功'},
					{value: '4', label: '上传失败'}
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
					searchConditionQuery: '',
					stateQuery: '',
					startTimeQuery: '',
					endTimeQuery: '',
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
				getVisitLogSearchList(this.fromFilters).then( res => {
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