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
				<el-form-item label="退回数据类型：" prop="dataTypeQuery">
					<el-select size="mini" v-model="fromFilters.dataTypeQuery" placeholder="请选择退回数据类型">
					    <el-option
					      v-for="item in returnTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="退回原因分类：" prop="returnCodeQuery">
					<el-select size="mini" v-model="fromFilters.returnCodeQuery" placeholder="请选择退回原因">
					    <el-option
					      v-for="item in returnReasonList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开始时间：" prop="startDateQuery">
					<el-date-picker
				      v-model="fromFilters.startDateQuery"
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
				<el-form-item label="结束时间：" prop="endDateQuery">
					<el-date-picker
				      v-model="fromFilters.endDateQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>		
				<el-form-item label="处理状态：" prop="excStateQuery">
					<el-select size="mini" v-model="fromFilters.excStateQuery" placeholder="请选择处理状态">
					    <el-option
					      v-for="item in excStateList"
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
			<el-table :data="tableList" border :loading="isLoading" @expand-change="rowExpandChange" :expand-row-keys="expands" :row-key="getRowKeys">
				<el-table-column type="expand">
                    <template slot-scope="props" v-if="expandAjaxFlag">
                        <el-form label-position="left" inline>
                            <el-form-item label="退回id号">
                                <span>{{ expandAjaxData.id }}</span>
                            </el-form-item>
                            <el-form-item label="IDC经营者">
                                <span>{{ expandAjaxData.idcName }}</span>
                            </el-form-item>
                            <el-form-item label="退回数据类别">
                                <span>{{ expandAjaxData.dataType }}</span>
                            </el-form-item>
                            <el-form-item label="机房编号">
                                <span>{{ expandAjaxData.serviceCode }}</span>
                            </el-form-item>
                            <el-form-item label="机房名称">
                                <span>{{ expandAjaxData.serviceName }}</span>
                            </el-form-item>
                            <el-form-item label="互联网出入口">
                                <span>{{ expandAjaxData.gatewayName }}</span>
                            </el-form-item>
                            <el-form-item label="IP段">
                                <span>{{ expandAjaxData.ipSegName }}</span>
                            </el-form-item>
                            <el-form-item label="机房机架名称">
                                <span>{{ expandAjaxData.frameName }}</span>
                            </el-form-item>
                            <el-form-item label="用户ID">
                                <span>{{ expandAjaxData.custId }}</span>
                            </el-form-item>
                            <el-form-item label="用户名称">
                                <span>{{ expandAjaxData.custName }}</span>
                            </el-form-item>
                            <el-form-item label="应用服务名称">
                                <span>{{ expandAjaxData.appServiceName }}</span>
                            </el-form-item>
                            <el-form-item label="域名">
                                <span>{{ expandAjaxData.domainName }}</span>
                            </el-form-item>
                            <el-form-item label="占用机房名称">
                                <span>{{ expandAjaxData.occupyServiceName }}</span>
                            </el-form-item>
                            <el-form-item label="退回原因分类">
                                <span>{{ expandAjaxData.returnCode }}</span>
                            </el-form-item>
                            <el-form-item label="退回原因说明">
                                <span>{{ expandAjaxData.returnMsg }}</span>
                            </el-form-item>
                            <el-form-item label="生成时间">
                                <span>{{ expandAjaxData.createTime }}</span>
                            </el-form-item>
                            <el-form-item label="处理状态">
                                <span>{{ expandAjaxData.excState }}</span>
                            </el-form-item>
                            <el-form-item label="处理时间">
                                <span>{{ expandAjaxData.excTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
			    <el-table-column label="IDC经营者" prop="idcName"></el-table-column>
			    <el-table-column label="机房编号" prop="serviceCode"></el-table-column>
			    <el-table-column label="机房名称" prop="serviceName"></el-table-column>
			    <el-table-column label="退回数据类别" prop="dataType">
			    	<template slot-scope="scope">
			    	  <!--查询类型 0=经营者,1=机房数据,2=用户数据-->
                        <span v-if="scope.row.dataType === '0'">经营者</span>
                        <span v-if="scope.row.dataType === '1'">机房数据</span>
                        <span v-if="scope.row.dataType === '2'">用户数据</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="退回原因分类" prop="returnCode">
			    	<template slot-scope="scope">
			    	  <!--0=上报记录通过核验,1=上报数据与既有数据记录冲突,2=上报数据内容不完整,3=上报数据内容错误；4=其他原因退回-->
                        <span v-if="scope.row.returnCode === 0">上报记录通过核验</span>
                        <span v-if="scope.row.returnCode === 1">上报数据与既有数据记录冲突</span>
                        <span v-if="scope.row.returnCode === 2">上报数据内容不完整</span>
                        <span v-if="scope.row.returnCode === 3">上报数据内容错误</span>
                        <span v-if="scope.row.returnCode === 4">其他原因退回</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="退回原因说明" prop="returnMsg"></el-table-column>
			    <el-table-column label="生成时间" prop="createTime"></el-table-column>
			    <el-table-column label="处理状态" prop="excState">
			    	<template slot-scope="scope">
			    	  <!--1=等待处理,2=处理完成,3=重新上报成功,4=重新上报失败-->
                        <span v-if="scope.row.excState === 1">等待处理</span>
                        <span v-if="scope.row.excState === 2">处理完成</span>
                        <span v-if="scope.row.excState === 3">重新上报成功</span>
                        <span v-if="scope.row.excState === 4">重新上报失败</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="处理时间" prop="excTime"></el-table-column>
			    <el-table-column label="退回ID号" prop="id"></el-table-column>
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
	import { getBackDataContentSearchList,getBackDataContentSearchSelect,getBackDataContentSearchDetail } from 'api/wbj/backDataContentSearch'
	
	export default {
		name: 'BackDataContentSearch',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				returnTypeList:[],
				returnReasonList:[],
				excStateList:[],
				getRowKeys (row) {
               		 return row['id']
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
            	 	serviceCodeQuery: '',
					dataTypeQuery: '',
					returnCodeQuery: '',
					startDateQuery: '',
					endDateQuery: '',
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
        //下拉框
        selectEvt(){
        	getBackDataContentSearchSelect().then(res => {
                if (res.status === 'success') {
                    this.serviceCodeList = res.message.serviceCodeList
                    this.returnTypeList = res.message.returnTypeList
                    this.returnReasonList = res.message.returnReasonList
                    this.excStateList = res.message.excStateList
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
				getBackDataContentSearchList(this.fromFilters).then( res => {
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
			rowExpandChange(row, expandedRows) {
              if(this.expands[0] !== row['id']) {
                getBackDataContentSearchDetail({id:row['id']}).then(res => {
                    if (res.status === 'success') {
                        this.expands = []
                        this.expands.push(row['id'])
                        this.expandAjaxFlag = true
                        this.expandAjaxData = res['message']
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
                    this.isLoading = false
                })
                 } else {
                this.expands = []
                this.expandAjaxFlag = false
            }
            
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