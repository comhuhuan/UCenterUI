<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="指令类型：" prop="commandTypeQuery">
					<el-select size="mini" v-model="fromFilters.commandTypeQuery" placeholder="请选择指令类型">
					    <el-option
					      v-for="item in commandTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="处理状态：" prop="statusQuery">
					<el-select size="mini" v-model="fromFilters.statusQuery" placeholder="请选择处理状态">
					    <el-option
					      v-for="item in statusList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开始日期：" prop="startTimeQuery">
					<el-date-picker
				      v-model="fromFilters.startTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="结束日期：" prop="endTimeQuery">
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
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="统计图类型：" prop="chartTypeQuery">
					<el-select size="mini" v-model="fromFilters.chartTypeQuery" placeholder="请选择统计图类型">
					    <el-option
					      v-for="item in chartTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				</div>
				<div class="more-btn">
               		<i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
        		</div>
			</el-form>
			<div class="parting-line"></div>
			<el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
			<el-table :data="tableList" border :loading="isLoading">
			    <el-table-column label="基础数据"></el-table-column>
			    <el-table-column label="基础数据异常监测"></el-table-column>
			    <el-table-column label="访问日志"></el-table-column>
			    <el-table-column label="违法信息监测记录"></el-table-column>
			    <el-table-column label="违法信息过滤记录"></el-table-column>
			    <el-table-column label="ISMS活动状态"></el-table-column>
			    <el-table-column label="活跃资源监测记录"></el-table-column>
			    <el-table-column label="违法违规日志"></el-table-column>
			    <el-table-column label="ISMS节点及链路状态"></el-table-column>
			    <el-table-column label="基础数据(私有接口)"></el-table-column>
			    <el-table-column label="物理机房上报"></el-table-column>
			    <el-table-column label="总数"></el-table-column>
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
	import { getLogRecordStatisticList,getCommandType } from 'api/wbj/logRecordStatistic'
	
	export default {
		name: 'LogRecordStatistic',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				commandTypeList:[],
				statusList: [
					{value: '1', label: '未解析'},
					{value: '2', label: '正在解析'},
					{value: '3', label: '解析成功'},
					{value: '4', label: '解析失败'}
				],
				chartTypeList: [
					{value: '1', label: '饼状图'},
					{value: '2', label: '曲线图'}
				],
				tableList: [],
				total:0,
				isShowMoreFilter: false,
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
		watch: {
      		isShowMoreFilter(val) {
        	this.gap = val ? 349 : 302
       	    this.setTableHeight()
      }
    },      
		methods: {
		//查询
        searchEvt() {
            this.getList()
        },
        //重置
        fromFiltersInit() {
            return {
					commandTypeQuery: '',
					statusQuery: '',
					startTimeQuery: '',
					endTimeQuery: '',
					chartTypeQuery: '',
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
        	getCommandType().then(res => {
                if (res.status === 'success') {
                    this.commandTypeList = res.message.commandTypeList
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
				getLogRecordStatisticList(this.fromFilters).then( res => {
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