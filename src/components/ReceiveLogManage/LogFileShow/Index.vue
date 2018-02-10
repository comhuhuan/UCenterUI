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
				<el-form-item label="文件名：" prop="fileNameQuery">
					<el-input size="mini" v-model="fromFilters.fileNameQuery" placeholder="请输入文件名"></el-input>
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
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="点击时间：" prop="clickDateQuery">
					<el-date-picker
				      v-model="fromFilters.clickDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="模块类型：" prop="modualQuery">
					<el-select size="mini" v-model="fromFilters.modualQuery" placeholder="请选择模块类型">
					    <el-option
					      v-for="item in modualList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="IP：" prop="ipQuery">
					<el-input size="mini" v-model="fromFilters.ipQuery" placeholder="请输入IP"></el-input>
				</el-form-item>
				<el-form-item label="文件路径：" prop="filePathQuery">
					<el-input size="mini" v-model="fromFilters.filePathQuery" placeholder="请输入文件路径"></el-input>
				</el-form-item>
				<el-form-item label="解析状态：" prop="statusQuery">
					<el-select size="mini" v-model="fromFilters.statusQuery" placeholder="请选择解析状态">
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
			    <el-table-column label="机房" prop="houseId"></el-table-column>
			    <el-table-column label="IP" prop="ip"></el-table-column>
			    <el-table-column label="指令类型" prop="commandType"></el-table-column>
			    <el-table-column label="文件名" prop="fileName"></el-table-column>
			    <el-table-column label="文件描述" prop="fileDesc"></el-table-column>
			    <el-table-column label="文件路径" prop="filePath"></el-table-column>
			    <el-table-column label="文件接收时间" prop="fileRecvTime"></el-table-column>
			    <el-table-column label="上报结果描述" prop="uploadResult"></el-table-column>
			    <el-table-column label="解析状态" prop="status">
			    	<template slot-scope="scope">
			    	  <!--协议类型 1=TCP,2=UDP-->
                        <span v-if="scope.row.status === 1">未解析</span>
                        <span v-if="scope.row.status === 2">正在解析</span>
                        <span v-if="scope.row.status === 3">解析成功</span>
                        <span v-if="scope.row.status === 4">解析失败</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="错误描述" prop="ackDesc"></el-table-column>
			    <el-table-column label="操作">
			    	<template slot-scope="scope">
                        <el-button type="text" size="small" @click="detailEvt(scope)">详情</el-button>
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
	import { getLogFileShowList,getServiceCode } from 'api/wbj/logFileShow'
	
	export default {
		name: 'LogFileShow',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				modualList: [
					{value: '1', label: '监测日志文件'},
					{value: '2', label: '过滤日志文件'},
					{value: '3', label: '活跃资源文件'},
					{value: '4', label: '活动状态文件'},
					{value: '5', label: '链路状态文件'},
					{value: '6', label: '网卡状态文件'}
				],
				statusList: [
					{value: '1', label: '未解析'},
					{value: '2', label: '正在解析'},
					{value: '3', label: '解析成功'},
					{value: '4', label: '解析失败'}
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
					fileNameQuery: '',
					startTimeQuery: '',
					endTimeQuery: '',
					clickDateQuery: '',
					modualQuery: '',
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
				getLogFileShowList(this.fromFilters).then( res => {
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