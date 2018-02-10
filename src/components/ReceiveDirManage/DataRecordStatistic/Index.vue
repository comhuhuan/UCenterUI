<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
				<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
				<el-form-item label="文件名：" prop="fileNameQuery">
					<el-input size="mini" v-model="fromFilters.fileNameQuery" placeholder="请输入指令ID号"></el-input>
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
				<el-form-item label="数据类型：" prop="commandTypeQuery">
					<el-select size="mini" v-model="fromFilters.commandTypeQuery" placeholder="请选择数据类型">
					    <el-option
					      v-for="item in commandTypeList"
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
				<el-form-item label="IP：" prop="ipQuery">
					<el-input size="mini" v-model="fromFilters.ipQuery" placeholder="请输入IP"></el-input>
				</el-form-item>
				<el-form-item label="文件路径：" prop="filePathQuery">
					<el-input size="mini" v-model="fromFilters.filePathQuery" placeholder="请输入文件路径"></el-input>
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
				</div>
				<div class="more-btn">
               		<i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
        		</div> 
			</el-form>
			<div class="parting-line"></div>
			<el-pagination style="float: right; margin-top: 10px;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-sizes="[10, 15, 50, 100]" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
            </el-pagination>
			<el-table :data="tableList" border :loading="isLoading">
			    <el-table-column label="IDC/ISP许可证号" prop="idcId"></el-table-column>
			    <el-table-column label="数据类型" prop="commandType">
			    	 	<template slot-scope="scope">
                        <!--数据类型 1-基础数据，2-基础数据异常监测；3-访问日志；4-违法信息监测记录；5-违法信息过滤记录；7-ISMS活动状态；8-活跃资源监测记录；9-违法违规日志；57-ISMS节点及链路状态；51-基础数据（私有接口）；60-物理机房上报}-->
                        <span v-if="scope.row.commandType === 1">基础数据</span>
                        <span v-if="scope.row.commandType === 2">基础数据异常监测</span>
                        <span v-if="scope.row.commandType === 3">访问日志</span>
                        <span v-if="scope.row.commandType === 4">违法信息监测记录</span>
                        <span v-if="scope.row.commandType === 5">违法信息过滤记录</span>
                        <span v-if="scope.row.commandType === 7">ISMS活动状态</span>
                        <span v-if="scope.row.commandType === 8">活跃资源监测记录</span>
                        <span v-if="scope.row.commandType === 9">违法违规日志</span>
                        <span v-if="scope.row.commandType === 51">基础数据（私有接口</span>
                        <span v-if="scope.row.commandType === 57">ISMS节点及链路状态</span>
                        <span v-if="scope.row.commandType === 60">物理机房上报</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="IP" prop="ip"></el-table-column>
			    <el-table-column label="文件名" prop="fileName"></el-table-column>
			    <el-table-column label="文件路径" prop="filePath"></el-table-column>
			    <el-table-column label="上传时间" prop="fileParseTime"></el-table-column>
			    <el-table-column label="上报结果描述" prop="errorDesc"></el-table-column>
			    <el-table-column label="处理状态" prop="status">
			    	<template slot-scope="scope">
                        <!--处理状态 1-未处理，2-正在处理，3-处理成功，4-处理失败-->
                        <el-tag size="mini"type="info" v-if="scope.row.status === 1">未处理</el-tag>
                        <el-tag size="mini" type="blue" v-if="scope.row.status === 2">正在处理</el-tag>
                        <el-tag size="mini" type="success"  v-if="scope.row.status === 3">处理成功</el-tag>
                        <el-tag size="mini" type="danger"  v-if="scope.row.status === 4">处理失败</el-tag>
                    </template>
			    </el-table-column>
			    <el-table-column label="smms返回结果描述" prop="ackDesc"></el-table-column>
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
	import { getDataRecordStatisticList,getCommandType } from 'api/wbj/dataRecordStatistic'
	
	export default {
		name: 'DataRecordStatistic',
		data() {
			return {
				fromFilters:this.fromFiltersInit(), 
				fromRules: {
					
				},
				commandTypeList: [],
				statusList: [
					{value: '0', label: '全部'},
					{value: '1', label: '未处理'},
					{value: '2', label: '正在处理'},
					{value: '3', label: '处理成功'},
					{value: '4', label: '处理失败'}
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
           			fileNameQuery: '',
					startTimeQuery: '',
					endtime: '',
					commandTypeQuery: '',
					ipQuery: '',
					filePathQuery: '',
					statusQuery: '',
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
				getDataRecordStatisticList(this.fromFilters).then( res => {
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