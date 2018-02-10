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
				<el-form-item label="过滤信息：" prop="keyWordQuery">
					<el-input size="mini" v-model="fromFilters.keyWordQuery" placeholder="请输入报警信息"></el-input>
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
				<el-form-item label="源IP：" prop="outIpQuery">
					<el-input size="mini" v-model="fromFilters.outIpQuery" placeholder="请输入源IP"></el-input>
				</el-form-item>
				<el-form-item label="目的IP：" prop="midQuery">
					<el-input size="mini" v-model="fromFilters.midQuery" placeholder="请输入目的IP"></el-input>
				</el-form-item>
				<el-form-item label="网址：" prop="urlQuery">
					<el-input size="mini" v-model="fromFilters.urlQuery" placeholder="请输入网址"></el-input>
				</el-form-item>
				<el-form-item label="域名：" prop="hostQuery">
					<el-input size="mini" v-model="fromFilters.hostQuery" placeholder="请输入域名"></el-input>
				</el-form-item>
					<el-form-item label="策略ID：" prop="ruleIdQuery">
					<el-input size="mini" v-model="fromFilters.ruleIdQuery" placeholder="请输入域名"></el-input>
				</el-form-item>
				</el-form-item>
					<el-form-item label="时间段：" prop="timeRangeQuery">
					<el-input size="mini" v-model="fromFilters.timeRangeQuery" placeholder="请选择时间段"></el-input>
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
			    <el-table-column label="机房名称" prop="serviceName"></el-table-column>
			    <el-table-column label="过滤信息" prop="blockReason"></el-table-column>
			    <el-table-column label="源IP" prop="outIp"></el-table-column>
			    <el-table-column label="源端口" prop="outPort"></el-table-column>
			    <el-table-column label="目的IP" prop="inIp"></el-table-column>
			    <el-table-column label="目的端口" prop="inPort"></el-table-column>
			    <el-table-column label="域名" prop="host"></el-table-column>
			    <el-table-column label="网址" prop="url"></el-table-column>
			    <el-table-column label="过滤时间" prop="curTime"></el-table-column>
			    <el-table-column label="快照"></el-table-column>
			    <el-table-column label="处置记录"></el-table-column>
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
	import { getFilterLogList,getServiceCode } from 'api/wbj/filterLog'
	
	export default {
		name: 'FilterLog',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
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
					serviceCodeQuery: '',
					keyWordQuery: '',
					startTimeQuery: '',
					endTimeQuery: '',
					outIpQuery: '',
					midQuery: '',
					urlQuery: '',
					hostQuery: '',
					ruleIdQuery: '',
					timeRangeQuery: '',
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
				getFilterLogList(this.fromFilters).then( res => {
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