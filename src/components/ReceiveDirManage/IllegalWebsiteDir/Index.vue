<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="违法网站指令ID：" prop="commandIdQuery">
					<el-input size="mini" v-model="fromFilters.commandIdQuery" placeholder="请输入违法网站指令ID号"></el-input>
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
				<el-form-item label="违法网站类型：" prop="subTypeQuery">
					<el-select size="mini" v-model="fromFilters.subTypeQuery" placeholder="请选择违法网站类型">
					    <el-option
					      v-for="item in subTypeList"
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
				</div>

				<div class="more-btn">
               		<i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
        		</div>
			</el-form>
			
			<div class="parting-line"></div>
			<el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
			<el-table :data="tableList" border :loading="isLoading">
			    <el-table-column label="违法网站指令ID" prop="commandId"></el-table-column>
			    <el-table-column label="违法网站名称" prop="nofilterblackName"></el-table-column>
			    <el-table-column label="违法网站类型" prop="type">
			    	 <template slot-scope="scope">
                        <!--违法网站类型 1-域名，2-IP}-->
                        <span v-if="scope.row.type === 1">域名</span>
                        <span v-if="scope.row.type === 2">IP</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="违法违规情况" prop="illegaltype"></el-table-column>
			    <el-table-column label="生成时间" prop="timeStamp"></el-table-column>
			    <el-table-column label="执行状态" prop="excState">
			    		<template slot-scope="scope">
                        <!--执行状态 1=等待处理,2=正在处理（blue）,3=处理成功（green）,4=处理失败（red）-->
                        <el-tag size="mini"type="info" v-if="scope.row.excState === 1">等待处理</el-tag>
                        <el-tag size="mini" type="blue" v-if="scope.row.excState === 2">正在处理</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.excState === 3">处理成功</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.excState === 4">处理失败</el-tag>
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
	import { getIllegalWebsiteDirList,getServiceCode } from 'api/wbj/illegalWebsiteDir'
	
	export default {
		name: 'IllegalWebsiteDir',
		data() {
			return {
				fromFilters: this.fromFiltersInit(),
				fromRules: {
					
				},
				excStateList:[
					{value: '0', label: '全部'},
					{value: '1', label: '等待处理'},
					{value: '2', label: '正在处理'},
					{value: '3', label: '处理成功'},
					{value: '4', label: '处理失败'}
				],
				subTypeList:[
					{value: '0', label: '全部'},
					{value: '1', label: '域名'},
					{value: '2', label: 'IP'}
				],
				serviceCodeList: [],
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
					subTypeQuery: '',
					serviceCodeQuery: '',
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
        //下拉框
        selectEvt(){
        	getServiceCode().then(res => {
                if (res.status === 'success') {
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
				getIllegalWebsiteDirList(this.fromFilters).then( res => {
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