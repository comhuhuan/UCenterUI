<template>
	<el-tabs type="border-card" tab-position="bottom" :activeName="activeName" >
		<el-tab-pane label="当前页" :closable="false" name="当前页">
			<el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
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
				<el-form-item label="起始接收时间：" prop="startDateQuery">
					<el-date-picker
					  size="mini"
				      v-model="fromFilters.startDateQuery"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="终止接收时间：" prop="endDateQuery">
					<el-date-picker
					 size="mini"
				      v-model="fromFilters.endDateQuery"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="指令ID号：" prop="commandIdQuery">
					<el-input size="mini" v-model="fromFilters.commandIdQuery" placeholder="请输入指令ID号"></el-input>
				</el-form-item>
					<el-form-item>		
					<el-button type="primary" @click="searchEvt">搜索</el-button>
					<el-button type="default" @click="czEvt">重置</el-button>
				</el-form-item>
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="指令验证：" prop="cmdCheckQuery">
					<el-select size="mini" v-model="fromFilters.cmdCheckQuery" placeholder="请选择指令验证结果">
					    <el-option
					      v-for="item in cmdVerifyList"
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
				<el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="下发指令编号">
                                <span>{{ props.row.commandSequence}}</span>
                            </el-form-item>
                            <el-form-item label="IDC/ISP许可证号">
                                <span>{{ props.row.idcId }}</span>
                            </el-form-item>
                            <el-form-item label="指令类型">
                                <span>{{ props.row.commandType }}</span>
                            </el-form-item>
                            <el-form-item label="哈希算法">
                                <span>{{ props.row.hashAlgorithm }}</span>
                            </el-form-item>
                            <el-form-item label="接收时间">
                                <span>{{ props.row.curTime }}</span>
                            </el-form-item>
                            <el-form-item label="指令ID号">
                                <span>{{ props.row.commandId }}</span>
                            </el-form-item>
                            <el-form-item label="指令验证">
                                <span>{{ props.row.resultCode }}</span>
                            </el-form-item>
                            <el-form-item label="返回信息">
                                <span>{{ props.row.resultMsg }}</span>
                            </el-form-item>
                            <el-form-item label="压缩格式">
                                <span>{{ props.row.compressionFormat }}</span>
                            </el-form-item>
                            <el-form-item label="对称加密算法">
                                <span>{{ props.row.encryptAlgorithm }}</span>
                            </el-form-item>
                            <el-form-item label="指令内容">
                                <span>{{ props.row.command }}</span>
                            </el-form-item>
                          </el-form>
                    </template>
                </el-table-column>
			    <el-table-column label="下发指令号" prop="commandSequence"></el-table-column>
			    <el-table-column label="IDC/ISP许可证号" prop="idcId"></el-table-column>
			    <el-table-column label="接收时间" prop="curTime"></el-table-column>
			    <el-table-column label="指令类型" prop="commandType">
			    	<template slot-scope="scope">
                        <!--指令类型 0=基础数据管理指令,1=访问日志查询指令,2=信息安全管理指令,3=管理指令查询指令,4=代码表发布指令,5=基础数据查询指令,6=信息安全查询指令,51=区域管控指令,52=指令执行过程查询指令,53=工单接口指令}-->
                        <span v-if="scope.row.commandType === 0">基础数据管理指令</span>
                        <span v-if="scope.row.commandType === 1">访问日志查询指令</span>
                        <span v-if="scope.row.commandType === 2">信息安全管理指令</span>
                        <span v-if="scope.row.commandType === 3">管理指令查询指令</span>
                        <span v-if="scope.row.commandType === 4">代码表发布指令</span>
                        <span v-if="scope.row.commandType === 5">基础数据查询指令</span>
                        <span v-if="scope.row.commandType === 6">信息安全查询指令</span>
                        <span v-if="scope.row.commandType === 51">区域管控指令</span>
                        <span v-if="scope.row.commandType === 52">指令执行过程查询指令</span>
                        <span v-if="scope.row.commandType === 53">工单接口指令</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="指令ID号" prop="commandId"></el-table-column>
			    <el-table-column label="返回信息" prop="resultMsg">
			    <template slot-scope="scope">
            	<el-tag v-if="scope.row.resultMsg === '正在处理'||scope.row.resultMsg === '正在取消'" size="mini" type="primary">
                {{scope.row.resultMsg}}
            	</el-tag>
           		 <el-tag v-else-if="scope.row.resultMsg === '操作成功'" size="mini" type="success">
                {{scope.row.resultMsg}}
            	</el-tag>
            	<el-tag v-else size="mini" type="danger">
                {{scope.row.resultMsg}}
           		 </el-tag>                      
         		 </template>       
			    </el-table-column>
			    <el-table-column label="版本号" prop="commandVersion"></el-table-column>
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
	import { getReceiveDirCheckList,getReceiveDirCheckSelect } from 'api/wbj/receiveDirCheck'
	
	export default {
		name: 'ReceiveDirCheck',
		data() {
			return {
			getRowKeys (row) {
                return row['commandId']
            },
            	expandsKey: 'commandId',
            	detailsIsLoading: true,
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				cmdTypeList: [],
				cmdVerifyList: [],
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
				startDateQuery: '',
				endDateQuery: '',
				commandIdQuery: '',
				cmdCheckQuery: '',
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
        	getReceiveDirCheckSelect().then(res => {
                if (res.status === 'success') {
                    this.cmdTypeList = res.message.cmdTypeList
                    this.cmdVerifyList = res.message.cmdVerifyList
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
				getReceiveDirCheckList(this.fromFilters).then( res => {
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
