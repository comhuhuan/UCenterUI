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
				<el-form-item label="IP：" prop="ipQuery">
					<el-input size="mini" v-model="fromFilters.ipQuery" placeholder="请输入IP"></el-input>
				</el-form-item>
				<el-form-item label="域名：" prop="hostQuery">
					<el-input size="mini" v-model="fromFilters.hostQuery" placeholder="请输入域名"></el-input>
				</el-form-item>
				<el-form-item label="应用端口：" prop="portQuery">
					<el-input size="mini" v-model="fromFilters.portQuery" placeholder="请输入网站IP"></el-input>
				</el-form-item>
				<el-form-item>		
					<el-button type="primary" @click="searchEvt">搜索</el-button>
					<el-button type="default" @click="czEvt">重置</el-button>
				</el-form-item>
				<div class="menu-content" v-if="isShowMoreFilter">
				<el-form-item label="传输层协议类型：" prop="protocolQuery">
					<el-select size="mini" v-model="fromFilters.protocolQuery" placeholder="请选择传输层协议类型">
					    <el-option
					      v-for="item in protocolList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="违法违规情况：" prop="illegalTypeQuery">
					<el-select size="mini" v-model="fromFilters.illegalTypeQuery" placeholder="请选择违法违规情况">
					    <el-option
					      v-for="item in illegalTypeList"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="查询日期：" prop="startTimeQuery">
					<el-date-picker
				      v-model="fromFilters.startTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="首次发现时间开始：" prop="firstStartTimeQuery">
					<el-date-picker
				      v-model="fromFilters.firstStartTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="首次发现时间结束：" prop="firstEndTimeQuery">
					<el-date-picker
				      v-model="fromFilters.firstEndTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="最近发现时间开始：" prop="lastStartTimeQuery">
					<el-date-picker
				      v-model="fromFilters.lastStartTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="最近发现时间结束：" prop="lastEndTimeQuery">
					<el-date-picker
				      v-model="fromFilters.lastEndTimeQuery"
				      size="mini"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="是否阻断：" prop="blockQuery">
					<el-select size="mini" v-model="fromFilters.blockQuery" placeholder="请选择是否阻断">
					    <el-option
					      v-for="item in blockList"
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
			    <el-table-column label="IP" prop="ip"></el-table-column>
			    <el-table-column label="域名" prop="domain"></el-table-column>
			    <el-table-column label="应用端口" prop="port"></el-table-column>
			    <el-table-column label="传输层协议类型" prop="protocol">
			    	<template slot-scope="scope">
			    	  <!--传输层协议类型 1=TCP,2=UDP-->
                        <span v-if="scope.row.protocol === '1'">TCP</span>
                        <span v-if="scope.row.protocol === '2'">UDP</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="违法违规情况" prop="illegalType">
			    	<template slot-scope="scope">
			    	  <!--违法违规情况 1-未备案2-违法网站 999-其他-->
                        <span v-if="scope.row.illegalType === '1'">未备案</span>
                        <span v-if="scope.row.illegalType === '2'">违法网站</span>
                        <span v-if="scope.row.illegalType === '999'">其他</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="首次发现时间" prop="firstFound"></el-table-column>
			    <el-table-column label="最近发现时间" prop="lastFound"></el-table-column>
			    <el-table-column label="访问量" prop="visitCount"></el-table-column>
			    <el-table-column label="是否阻断" prop="block">
			    	<template slot-scope="scope">
			    	  <!--是否阻断 0-未阻断1-阻断-->
                        <span v-if="scope.row.block === '0'">未阻断</span>
                        <span v-if="scope.row.block === '1'">阻断</span>
                    </template>
			    </el-table-column>
			    <el-table-column label="服务内容" prop="serviceContent"></el-table-column>
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
	import { getIllegalWebSiteLogList,getServiceCode } from 'api/wbj/illegalWebSiteLog'
	
	export default {
		name: 'IllegalWebSiteLog',
		data() {
			return {
				fromFilters:this.fromFiltersInit(),
				fromRules: {
					
				},
				serviceCodeList:[],
				protocolList: [
					{value: '1', label: 'TCP'},
					{value: '2', label: 'UDP'}
				],
				illegalTypeList: [
					{value: '1', label: '未备案'},
					{value: '2', label: '违法网站'},
					{value: '999', label: '其他'}
				],
				blockList: [
					{value: '0', label: '未阻断'},
					{value: '1', label: '阻断'}
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
					ipQuery: '',
					hostQuery: '',
					portQuery: '',
					protocolQuery: '',
					illegalTypeQuery: '',
					startTimeQuery: '',
					firstStartTimeQuery: '',
					firstEndTimeQuery: '',
					lastStartTimeQuery: '',
					lastEndTimeQuery: '',
					blockQuery: '',
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
				getIllegalWebSiteLogList(this.fromFilters).then( res => {
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