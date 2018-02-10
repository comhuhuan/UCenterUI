<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="免过滤指令ID：" prop="commandIdQuery">
					<el-input size="mini" v-model="fromFilters.commandIdQuery" placeholder="请输入免过滤指令ID号"></el-input>
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
				<el-form-item label="免过滤类型：" prop="noFilterTypeQuery">
					<el-select size="mini" v-model="fromFilters.noFilterTypeQuery" placeholder="请选择免过滤类型">
					    <el-option
					      v-for="item in noFilterTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
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
				<el-form-item>		
					<el-button type="primary" @click="searchEvt">搜索</el-button>
					<el-button type="default" @click="czEvt">重置</el-button>
				</el-form-item>
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="开始时间：" prop="startDateQuery">
					<el-date-picker
				      v-model="fromFilters.startDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="结束时间：" prop="endDateQuery">
					<el-date-picker
				      v-model="fromFilters.endDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				</div>

				<div class="more-btn">
               		<i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
        		</div>
			</el-form>
			
			<div class="parting-line"></div>
			<el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
			 <el-table :data="tableList" border :loading="isLoading" @expand-change="rowExpandChange" :expand-row-keys="expands" :row-key="getRowKeys">
			 	<el-table-column type="expand">
                    <template slot-scope="props" v-if="expandAjaxFlag">
                        <el-form label-position="left" inline>
                            <el-form-item label="下发范围">
                                <span>{{ expandAjaxData.serviceName }}</span>
                            </el-form-item>
                            <el-form-item label="免过滤指令ID">
                                <span>{{ expandAjaxData.commandId }}</span>
                            </el-form-item>
                            <el-form-item label="免过滤类型">
                                <span>{{ expandAjaxData.type }}</span>
                            </el-form-item>
                            <el-form-item label="免过滤内容">
                                <span>{{ expandAjaxData.content }}</span>
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
			    <el-table-column label="免过滤指令ID" prop="commandId"></el-table-column>
			    <el-table-column label="免过滤名称" prop="noFilterName"></el-table-column>
			    <el-table-column label="免过滤类型" prop="noFilterType"></el-table-column>
			    <el-table-column label="生成时间" prop="createDate"></el-table-column>
			    <el-table-column label="执行状态" prop="excState">
			    	<template slot-scope="scope">
                        <!--执行状态正在处理（blue）；处理成功（green）；部分处理成功（red）； 处理失败（red）；-->
                        <el-tag size="mini"type="danger" v-if="scope.row.excState === '部分处理成功'">{{scope.row.excState}}</el-tag>
                        <el-tag size="mini" type="blue" v-if="scope.row.excState === '正在处理'">{{scope.row.excState}}</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.excState === '处理成功'">{{scope.row.excState}}</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.excState === '处理失败'">{{scope.row.excState}}</el-tag>
                    </template>
				</el-table-column>
			    <el-table-column label="操作"></el-table-column>
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
	import { getAvoidFilterWebsiteDirList,getAvoidFilterWebsiteDirSelect } from 'api/wbj/avoidFilterWebsiteDir'
	
	export default {
		name: 'BasicDataSearchDir',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				excStateList:[],
				noFilterTypeList:[],
				serviceCodeList: [],
				getRowKeys (row) {
               		 return row['commandId']
            	},
				expands: [],
            	expandAjaxFlag: false,
            	expandAjaxData:{},
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
					commandIdQuery: '',
					excStateQuery: '',
					noFilterTypeQuery: '',
					serviceCodeQuery: '',
					startDateQuery: '',
					endDateQuery: '',
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
        	getAvoidFilterWebsiteDirSelect().then(res => {
                if (res.status === 'success') {
                    this.excStateList = res.message.excStateList
                    this.noFilterTypeList = res.message.noFilterTypeList
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
			getList() {
				this.isLoading = true
				getAvoidFilterWebsiteDirList(this.fromFilters).then( res => {
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