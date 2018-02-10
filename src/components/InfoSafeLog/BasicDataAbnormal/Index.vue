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
				<el-form-item label="登记异常：" prop="errorQuery">
					<el-select size="mini" v-model="fromFilters.errorQuery" placeholder="请选择登记异常">
					    <el-option
					      v-for="item in errorList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备案类型：" prop="notPutOnRecordsQuery">
					<el-select size="mini" v-model="fromFilters.notPutOnRecordsQuery" placeholder="请选择备案类型">
					    <el-option
					      v-for="item in notPutOnRecordsList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="网站IP：" prop="ipQuery">
					<el-input size="mini" v-model="fromFilters.ipQuery" placeholder="请输入查询内容"></el-input>
				</el-form-item>
				<el-form-item>		
					<el-button type="primary" @click="searchEvt">搜索</el-button>
					<el-button type="default" @click="czEvt">重置</el-button>
				</el-form-item>
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="域名：" prop="domainQuery">
					<el-input size="mini" v-model="fromFilters.domainQuery" placeholder="请输入查询内容"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="currentStateQuery">
					<el-select size="mini" v-model="fromFilters.currentStateQuery" placeholder="请选择状态">
					    <el-option
					      v-for="item in currentStateList"
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
			    <el-table-column label="机房名称" prop="serviceName"></el-table-column>
			    <el-table-column label="网站IP" prop="ip"></el-table-column>
			    <el-table-column label="实际域名" prop="domain"></el-table-column>
			    <el-table-column label="首次发现时间" prop="firstfindTime"></el-table-column>
			    <el-table-column label="最近一次发现时间" prop="lastfindTime"></el-table-column>
			    <el-table-column label="登记异常" prop="error">
			    	<template slot-scope="scope">
			    	  <!--0-'正常' ;1- 'IP登记保留，实际为启用' ;2 - 'IP登记域名有误' ; 3 -'IP未登记-->
                        <span v-if="scope.row.error === '0'">正常</span>
                        <span v-if="scope.row.error === '1'">IP登记保留，实际为启用</span>
                        <span v-if="scope.row.error === '2'">IP登记域名有误</span>
                        <span v-if="scope.row.error === '3'">IP未登记</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="备案异常" prop="icperror"></el-table-column>
			    <el-table-column label="实际使用方式" prop="realUseType"></el-table-column>
			    <el-table-column label="登记使用方式" prop="useType"></el-table-column>
			    <el-table-column label="登记域名" prop="regDomain"></el-table-column>
			    <el-table-column label="状态" prop="state">
			    	<template slot-scope="scope">
			    	  <!--1-已封堵，0-未封堵-->
                        <span v-if="scope.row.state === '0'">未封堵</span>
                        <span v-if="scope.row.state === '1'">已封堵</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="处置记录" ></el-table-column>
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
	import { getBasicDataAbnormalList,getServiceCode } from 'api/wbj/basicDataAbnormal'
	
	export default {
		name: 'BasicDataAbnormal',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				errorList: [
					{value: '0', label: '正常'},
					{value: '1', label: 'IP登记保留，实际为启用'},
					{value: '2', label: 'IP登记域名有误'},
					{value: '3', label: 'IP未登记'}
				],
				notPutOnRecordsList: [
					{value: '0', label: '正常'},
					{value: '1', label: '未备案'}
				],
				currentStateList: [
					{value: '1', label: '已封堵'},
					{value: '0', label: '未封堵'}
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
					errorQuery: '',
					notPutOnRecordsQuery: '',
					ipQuery: '',
					domainQuery: '',
					currentStateQuery: '',
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
				getBasicDataAbnormalList(this.fromFilters).then( res => {
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