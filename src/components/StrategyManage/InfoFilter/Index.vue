<template>
	<el-tabs class="tabs-home-page" type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="removeTabHandle" @tab-click="setActiveTab">
		<el-tab-pane label="主页" :closable="false" name="主页" :loading="initLoading">
			<el-form label-width="auto" inline :model="formFilter" ref="formFilter">
				<el-form-item label="过滤名称：" prop="nameQuery">
					<el-input size="mini" placeholder="请输入过滤名称" v-model="formFilter.nameQuery" ></el-input>
				</el-form-item>
				<el-form-item label="下发类型：" prop="statusQuery">
					<el-select size="mini" v-model="formFilter.statusQuery" placeholder="请选择下发类型">
					    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期过滤：" prop="dateQuery" :editable="false">
					<el-date-picker size="mini"
				      	v-model="formFilter.dateStartQuery"
				      	type="daterange"
				      	range-separator="至"
				      	start-placeholder="开始日期"
				      	end-placeholder="结束日期">
				    </el-date-picker>
					<!-- <el-date-picker size="mini" v-model="formFilter.dateStartQuery" type="date" placeholder="选择日期"></el-date-picker> -->
				</el-form-item>
				<!--<el-form-item label="结束时间：" prop="dateEndQuery" :editable="false">
					<el-date-picker size="mini" v-model="formFilter.dateEndQuery" type="date" placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>-->
				<!-- <div class="more-filter" > -->
					<el-form-item label="机房名称：" prop="serviceCodeQuery" v-if="isShowMoreFilter">
						<el-select size="mini" v-model="formFilter.serviceCodeQuery" placeholder="请选择机房名称">
						    <el-option v-for="item in serviceCodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="策略内容：" prop="contentQuery" v-if="isShowMoreFilter">
						<el-input size="mini" placeholder="请输入策略内容" v-model="formFilter.contentQuery"></el-input>
					</el-form-item>
				<!-- </div> -->
				<el-form-item>
					<el-button type="primary" @click="getTableList" :disabled="authorizeBtns.indexOf('1') === -1" :title="authorizeBtns.indexOf('1') === -1 ? '无权限操作' : ''">搜索</el-button>
					<!-- <el-button type="default" @click="">重置</el-button> -->
					<el-button type="primary" @click="resetForm('formFilter')">重置</el-button>
				</el-form-item>

				<div class="more-btn">
					<!-- <el-tooltip effect="dark" content="更多选项" placement="top-start"> -->
						<i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
					<!-- </el-tooltip> -->
				</div>
			</el-form>

			<div class="parting-line"></div>

			<div class="top-operate">
				<el-button-group>
	                <el-button type="default" icon="icon iconfont icon-xinzenghuizong" @click="addHandle">&nbsp;新增</el-button>
	                <el-button type="default" icon="icon iconfont icon-daoru-tianchong" @click="importHandle">&nbsp;导入</el-button>
	                <!-- <el-button type="default" icon="icon iconfont icon-daochu-tianchong" @click="exportHandle">&nbsp;导出</el-button> -->
					<el-button type="default">
						<span><i class="icon iconfont icon-daochu-tianchong"></i>&nbsp;导出</span>
						<el-select size="mini" v-model="exportType" @change="exportHandle" class="table-header-select" >
							<el-option v-for="item in exportsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-button>
					<el-button type="default" icon="icon iconfont icon-batch-import" :disabled="!hasSelected" @click.native="sendDispatch({type: 0})">&nbsp;批量下发</el-button>
					<el-button type="default" icon="icon iconfont icon-batch-del" :disabled="!hasSelected" @click.native="sendDispatch({type: 1})">&nbsp;批量取消下发</el-button>
					<el-button type="default">
						<span><i class="icon iconfont icon-shaixuan"></i>&nbsp;筛选表头</span>
						<el-select size="mini" v-model="selectHeaderFields" @change="selectHeaderFieldsHandle" class="table-header-select" multiple collapse-tags>
							<el-option v-for="(col, index) in columns" :key="col.prop" :label="col.label" :value="col.prop" v-if="index !== columns.length - 1"></el-option>
						</el-select>
					</el-button>
	            </el-button-group>
	            <el-pagination @size-change="handleSizeChange" :current-page.sync="pageFilters.pageIndex"
					:page-sizes="pageSizes"
					:page-size="pageFilters.pageSize" layout="total, sizes" :total="total">
	            </el-pagination>
			</div>

			<el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight" @selection-change="selectionChange">
				<el-table-column type="selection" width="45" :selectable="setIsSelectable"></el-table-column>
				<el-table-column v-for="col in columns"
					:key="col.prop" :label="col.label" :prop="col.prop"
					:fixed="col.fixed"
					:width="col.width"
					v-if="!col.hidden"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						<div class="operate-btns" v-if="col.prop === 'operationButton'">
							<!--<el-button v-for="(btn, index) in scope.row.operationButton"
								:key="btn.type" :title="btn.title" size="small"
								:disabled="btn.hidden"
								type="text"
								:class="{'el-button--more': scope.row.operationButton.length > 1}"
								@click="btnsHandle(scope.row, btn.type)">
								{{btn.text}}
							</el-button>-->
							<div class="send-loading" v-show="scope.row.operationButton.isLoading">
								<i class="el-icon-loading"></i>
							</div>
							<div class="btn-div" v-for="(btn, index) in scope.row.operationButton.list" :key="btn.type">
								<el-button v-if="btn.type !== '9999'" type="text" size="small"
									:title="btn.title" :disabled="btn.hidden"
									@click="btnsHandle(btn, scope.row, scope.$index)"
								>{{btn.text}}</el-button>
								<el-popover trigger="click" placement="bottom-end"
									popper-class="more-btns-popover" v-else
								>
									<div slot="reference">
										<el-button type="text" size="small" :title="btn.title"
											:disabled="btn.hidden"
										>
											{{btn.text}}
											<i v-if="btn.type === '9999'" class="el-icon-caret-bottom"></i>
										</el-button>
									</div>
									<ul>
										<li v-for="b in btn.btns" :key="b.type">
											<a href="javascript:;" :title="b.title" :class="{'is-disabled': b.hidden}" @click="btnsHandle(b, scope.row, scope.$index)">{{b.text}}</a>
										</li>
									</ul>
								</el-popover>
							</div>
							<!--<el-button v-for="(btn, index) in scope.row.operationButton"
								:key="btn.type" :title="btn.title" size="small"
								:disabled="btn.hidden"
								type="text"
								:class="{'el-button--more': scope.row.operationButton.length > 1}"
								@click.stop="btnsHandle(btn, scope.row, scope.$index)">
								{{btn.text}}
								<i v-if="btn.type === '9999'" class="el-icon-caret-bottom"></i>
								<ul v-if="btn.type === '9999'" v-show="btn.isShow">
									<li v-for="b in btn.btns" :key="b.type">
										<a href="javascript:;" :class="{'is-disabled': btn.hidden}" @click="btnsHandle(scope.row, btn.type)">{{b.text}}</a>
									</li>
								</ul>
							</el-button>-->
						</div>
						<div class="" v-else-if="col.prop === 'excstateLabel'">
							<div class="" v-if="scope.row.isProcess === 0">
								<!-- {{scope.row.operationButton.percentage}} -->
								<el-progress :percentage="scope.row.operationButton.percentage"  :text-inside="true" :stroke-width="18" v-if="scope.row.operationButton.percentage <= 100"></el-progress>
								<el-tag size="small" :type="scope.row.operationButton.statusLable | executingState" v-else>{{scope.row.operationButton.statusLable}}</el-tag>
							</div>
							<el-tag size="small" :type="scope.row.excstateLabel | executingState" v-else>{{scope.row.excstateLabel}}</el-tag>
						</div>
						<div class="" v-else>
							{{scope.row[col.prop]}}
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="bottom-operate">
	            <el-pagination
	                @current-change="handleCurrentChange"
	                :current-page.sync="pageFilters.pageIndex"
	                :page-size="pageFilters.pageSize"
	                :page-sizes="pageSizes"
	                layout="prev, pager, next, jumper"
	                :total="total">
	            </el-pagination>
	        </div>
		</el-tab-pane>
		<el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
			<keep-alive>
				<component :is="tab.component" @removeTab="removeTabHandle" :parentData="tab"></component>
			</keep-alive>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import tableMixin from '@/mixins/tableMixin'
	import pageMixin from '@/mixins/pageMixin'
	import formMixin from '@/mixins/formMixin'
	import innerTabsMixin from '@/mixins/innerTabsMixin'
	import filterMixin from '@/mixins/filterMixin'
	import { getInitData, getList, del, send, getOperation } from 'api/gjg/infoFilter'
	import Edit from './Edit'
	import Detail from './Detail'
	import EUDetail from './EUDetail'
	import ImportTpl from './ImportTpl'
	import { exportsList } from 'constants/common'
	import { exportDo } from 'api/gjg/infoFilter'
	import { exportFn } from 'utils/util'

	export default {
		name: 'InfoFilter',
		mixins: [tableMixin, pageMixin, formMixin, innerTabsMixin, filterMixin],
		props: {
			authorizeBtns: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				exportsList,
				exportType: '',
				formFilter: {
					'nameQuery': '',
					'statusQuery': '',
					'dateStartQuery': '',
					'dateEndQuery': '',
					'serviceCodeQuery': '',
					'contentQuery': '',
					userId: this.$root.r_user_id,
				},
				statusList: [
					{label: '全部', value: ''},
					{label: '待下发', value: 1},
					{label: '下发', value: 2},
					{label: '取消', value: 3},
				],
				columns: [
					{label: '过滤ID', prop: 'commandId', hidden: false, },
					{label: '过滤名称', prop: 'name', hidden: false, },
					{label: '过滤类型', prop: 'groupType', hidden: false, },
					{label: '操作人员', prop: 'owner', hidden: false, },
					{label: '创建时间', prop: 'timeStamp', hidden: false, },
					{label: '过期时间', prop: 'expiredTime', hidden: false, type: 'selection',},
					{label: '下发类型', prop: 'statusLabel', hidden: false, },
					{label: '执行状态', prop: 'excstateLabel', hidden: false, },
					// {label: '信息过滤主键', prop: 'idcCommandId hidden: false,', },
					// {label: '期限标识', prop: 'isWu hidden: false,', },
					{label: '操作', prop: 'operationButton', hidden: false, fixed: 'right', width: 142,},
				],
				selectedColumns: '',
				isShowMoreFilter: false,
				userId: this.$root.r_user_id,
				initLoading: false,
				tableLoading: false,
				matchModelList: null,
				matchRangeList: null,
				serviceCodeList: null,
				tableList: null,
				hasSelected: false,
				selectHeaderFields: ['commandId', 'name', 'groupType', 'owner', 'timeStamp', 'expiredTime', 'statusLabel', 'excstateLabel'],
	            selectedList: [],
	            operateFilters: {
	                 commandIds: ''
	            },
	            gap: 302,
				counter: 0
			}
		},
		created() {
			console.log(this.authorizeBtns)
			this.getInitData()
			this.getTableList()
		},
		mounted() {

		},
		watch: {
			isShowMoreFilter(val) {
				this.gap = val ? 349 : 302
				this.setTableHeight()
			}
		},
		methods: {
			getInitData() {
				this.initLoading = true
				getInitData({userId: this.userId}).then( res => {
					if( res.status === 'success') {
						this.matchModelList = res.message.matchModelList
						this.matchRangeList = res.message.matchRangeList
						this.serviceCodeList = res.message.serviceCodeList
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						})
					}
					this.initLoading = false
				}).catch( err => {
					console.log(err)
					this.initLoading = false
				})
			},
			getTableList() {
				this.tableLoading = true
				// console.log(this.formFilter)
				const params = {...this.formFilter, ...this.pageFilters}
				getList(params).then( res => {
					if( res.status === 'success') {
						this.tableList = res.message.rows
						if(this.tableList.length > 0) {
							this.tableList.forEach( item => {
								if(item.isWu == 30) {
									item.expiredTime = '无期限'
								} else {

								}
								// console.log(this.reverseBtns(item.operationButton))
								item.operationButton = this.reverseBtns(item.operationButton)
								/*if(item.isProcess === 0) {
									this.refreshSendStatus({
										commandId: item.commandId,
										idcCommandId: item.idcCommandId
									}, index)
								}*/
							})
						}

						this.total = res.message.total
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						})
					}
					this.tableLoading = false
				}).catch( err => {
					console.log(err)
					this.tableLoading = false
				})
			},
			selectHeaderFieldsHandle(val) {
				this.columns.forEach( col => {
					if(col.prop !== 'operationButton') {
						col.hidden = !val.includes(col.prop)
					}
				})
			},
			selectionChange(selection) {
	            // console.log(selection)
	            this.hasSelected = false
	            if(selection.length > 0) {
	                this.hasSelected = true
	                const ids = []
	                selection.forEach( item => {
	                    ids.push(item.commandId)
	                })
	                this.operateFilters.commandIds = ids.join(',')
	            }
	        },
			setIsSelectable(row, index) {
				// console.log(row)
				return new Date(row.expiredTime).getTime() > Date().now || row.expiredTime === '无期限' && !row.isNotSelectable
			},
			reverseBtns(btns, isLoading = false) {
				const operateBtns = {
					isLoading,
					percentage: this.counter,
					statusLable: '下发成功',
					list: [{
						hidden: false,
						text: '详情',
						type: '0000',
						title: '查看详情'
					}]
				}
				const moreBtns = {type: '9999',  text: '更多', btns: []}
				btns.forEach( btn => {
					if(btn.type == 4) {
						btn.text = '编辑'
						operateBtns.list.push(btn)
					} else {
						if(btn.type == 1) {
							btn.text = '查看EU'
							// btn.hidden = true
						} else if(btn.type == 2) {
							btn.text = '下发'
							btn.hidden = isLoading ? isLoading : btn.hidden
						} else if(btn.type == 3) {
							btn.text = '取消下发'
							btn.hidden = isLoading ? isLoading : btn.hidden
						} else if(btn.type == 5) {
							btn.text = '删除'
							btn.hidden = isLoading ? isLoading : btn.hidden
						}
						moreBtns.btns.push(btn)
					}
				})
				operateBtns.list.push(moreBtns)
				// console.log(operateBtns)
				return operateBtns
			},
			btnsHandle(btn, data, index) {
				if(btn.hidden) return
				console.log(btn, data)
				$("body").click()
				const commandId = data.commandId
				if(btn.type === '0000') { // 详情
					this.addTab({
						name: '详情',
						commandId,
						expiredTime: data.expiredTime,
						component: Detail
					})
				} else if(btn.type == '1') {  // 查看EU详情
					this.addTab({
						name: 'EU详情',
						commandId,
						idcCommandId: data.idcCommandId,
						serviceCodeList: this.serviceCodeList,
						component: EUDetail
					})
				} else if(btn.type == '2') {  // 下发
					this.sendHandle({
						commandIds: commandId,
						type: 0
					}, {
						commandId,
						idcCommandId: data.idcCommandId,
					}, index)
				} else if(btn.type == '3') {  // 取消下发
					this.sendHandle({
						commandIds: commandId,
						type: 1
					}, {
						commandId,
						idcCommandId: data.idcCommandId,
					}, index)
				} else if(btn.type == '4') { // 编辑
					this.addTab({
						matchModelList: this.matchModelList,
						matchRangeList: this.matchRangeList,
						serviceCodeList: this.serviceCodeList,
						commandId,
						name: '修改',
						component: Edit
					})
				} else if(btn.type == '5') { // 删除
					this.delHandle({
						commandId
					})
				}
			},
			sendDispatch(params) {
				params = {...params, ...this.operateFilters}
				const commandIds = this.operateFilters.commandIds
				const btnParams = []
				const indexs = []
				this.tableList.forEach( (col, index) => {
					if(commandIds.indexOf(col.commandId) > -1) {
						btnParams.push({
							commandId: col.commandId,
							idcCommandId: col.idcCommandId,
						})
						indexs.push(index)
					}
				})
				this.sendHandle(params, btnParams, indexs, true)
			},
			sendHandle(params, btnParams, index, isBatch) {
				// this.tableLoading = true
				send(params).then( res => {
					if(res.status === 'success') {
						this.counter = 0
						if(isBatch) {
							btnParams.forEach( (item, i) => {
								this.refreshSendStatus(item, index[i])
							})
						} else {
							this.refreshSendStatus(btnParams, index)
						}
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						})
					}
					// this.tableLoading = false
				}).catch( err => {
					console.log(err)
					// this.tableLoading = false
				})
			},
			refreshSendStatus(btnParams, index) {
                console.log(this.counter)
				getOperation(btnParams).then( res => {
					if(res.status === 'success') {
						this.counter++
						// if(res.message.operationResult === 0) {
						if(res.message.operationResult === 0 && this.counter <= 100) {
							// 下发时不能选择复选框
							this.tableList[index].isNotSelectable = true
							this.tableList[index].operationButton = this.reverseBtns(res.message.operationButton, true)
							setTimeout( _ => {
								this.refreshSendStatus(btnParams, index)
							}, 100)
						} else {
							this.tableList[index].isNotSelectable = false
							this.tableList[index].operationButton = this.reverseBtns(res.message.operationButton)
						}
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							showClose: true,
						})
					}
				}).catch( err => {
					console.log(err)
					this.tableLoading = false
				})
			},
			delHandle(params) {
				this.$confirm('请确认是否删除此过滤信息吗？', '提示', {
	                comfirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	            }).then( _ => {
					this.tableLoading = true
	                del(params).then( res => {
	                    const flag = res.status === 'success'
	                    this.$message({
	                        type: flag ? 'success' : 'error',
	                        message: flag ? '删除成功' : res.message,
	                        // message: res.message,
	                        showClose: true,
	                    })
	                    if( flag ) {
	                        this.getTableList()
	                    }
	                    this.tableLoading = false
	                }).catch( err => {
	                    console.log(err)
	                    this.tableLoading = false
	                })
	            }).catch(() => {
	                this.$message({
	                    type: 'info',
	                    message: '已取消删除！',
	                    showClose: true
	                })
	            })
			},
			addHandle() {
				this.addTab({
					matchModelList: this.matchModelList,
					matchRangeList: this.matchRangeList,
					serviceCodeList: this.serviceCodeList,
					commandId: '',
					name: '新增',
					component: Edit
				})
			},
			importHandle() {
				this.addTab({
					// matchModelList: this.matchModelList,
					matchRangeList: this.matchRangeList,
					// serviceCodeList: this.serviceCodeList,
					commandId: '',
					name: '导入',
					component: ImportTpl
				})
			},
			exportHandle(val) {
				// console.log(val, this.exportType)
				const params = {...this.formFilter, ...this.pageFilters, exportType: this.exportType}
				// console.log(params)
				const loadingInstance = this.$loading({
		          	lock: true,
		          	text: '正在导出，请稍等...',
		          	spinner: 'el-icon-loading',
		          	background: 'rgba(0, 0, 0, 0.7)'
		        });
				exportDo(params).then( res => {
					if(res.status === 'success') {
						exportFn(res.message.filePath, res.message.fileName)
					} else {
						this.$message({
	                        showClose: true,
	                        message: res.message,
	                        type: 'error'
	                    })
					}
					loadingInstance.close()
				}).catch( err => {
					console.log(err)
					loadingInstance.close()
				})
			}

		}
	}

</script>

<style src="static/css/tabsHomePage.less" lang="less" scoped></style>
