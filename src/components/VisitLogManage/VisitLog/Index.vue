<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="EU名称：" prop="serviceCodeQuery">
					<el-select size="mini" v-model="fromFilters.serviceCodeQuery" placeholder="请选择EU名称">
					    <el-option
					      v-for="item in serviceCodeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="查询日期：" prop="endTimeQuery">
					<el-date-picker
				      v-model="fromFilters.endTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="源IP：" prop="outIpQuery">
					<el-input size="mini" v-model="fromFilters.outIpQuery" placeholder="请输入源IP"></el-input>
				</el-form-item>
				<el-form-item label="时间段：" prop="timeRangeQuery">
					<el-date-picker
				      v-model="fromFilters.timeRangeQuery"
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
				<el-form-item label="目的IP：" prop="serverIpQuery">
					<el-input size="mini" v-model="fromFilters.serverIpQuery" placeholder="请输入目的IP"></el-input>
				</el-form-item>
				<el-form-item label="网址：" prop="urlQuery">
					<el-input size="mini" v-model="fromFilters.urlQuery" placeholder="请输入网址"></el-input>
				</el-form-item>
				<el-form-item label="代理类型：" prop="proxyTypeQuery">
					<el-select size="mini" v-model="fromFilters.proxyTypeQuery" placeholder="请选择代理类型">
					    <el-option
					      v-for="item in proxyTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="代理端口：" prop="proxyPortQuery">
					<el-input size="mini" v-model="fromFilters.proxyPortQuery" placeholder="请输入代理端口"></el-input>
				</el-form-item>
				<el-form-item label="协议类型：" prop="transTypeQuery">
					<el-select size="mini" v-model="fromFilters.transTypeQuery" placeholder="请选择协议类型">
					    <el-option
					      v-for="item in transTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="源端口：" prop="srcPortQuery">
					<el-input size="mini" v-model="fromFilters.srcPortQuery" placeholder="请输入源端口"></el-input>
				</el-form-item>
				<el-form-item label="目的端口：" prop="destPortQuery">
					<el-input size="mini" v-model="fromFilters.destPortQuery" placeholder="请输入目的端口"></el-input>
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
			    <el-table-column label="EU编号" prop="commonCode"></el-table-column>
			    <el-table-column label="机房名称" prop="serverName"></el-table-column>
			    <el-table-column label="目的IP" prop="serverIp"></el-table-column>
			    <el-table-column label="网址" prop="url"></el-table-column>
			    <el-table-column label="代理类型/端口" prop="proxyType"></el-table-column>
			    <el-table-column label="域名" prop="domain"></el-table-column>
			    <el-table-column label="源IP" prop="outIp"></el-table-column>
			    <el-table-column label="记录时间" prop="curTime"></el-table-column>
			    <el-table-column label="协议类型" prop="transType">
			    	<template slot-scope="scope">
			    	  <!--协议类型 1=TCP,2=UDP-->
                        <span v-if="scope.row.transType === '1'">TCP</span>
                        <span v-if="scope.row.transType === '2'">UDP</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="持续时长" prop="howLong"></el-table-column>
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
	import { getVisitLogList,getServiceCode } from 'api/wbj/visitLog'
	
	export default {
		name: 'VisitLog',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				proxyTypeList: [
					{value: '0', label: '无代理'},
					{value: '1', label: 'HTTP'},
					{value: '2', label: 'SOCK4'},
					{value: '3', label: 'SOCK5'}
				],
				transTypeList: [
					{value: '1', label: 'TCP'},
					{value: '2', label: 'UDP'}
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
					serviceCodeQuery: '',
					endTimeQuery: '',
					outIpQuery: '',
					timeRangeQuery: '',
					serverIpQuery: '',
					urlQuery: '',
					proxyTypeQuery: '',
					proxyPortQuery: '',
					transTypeQuery: '',
					srcPortQuery: '',
					destPortQuery: '',
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
				getVisitLogList(this.fromFilters).then( res => {
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