<template> 
	<el-tabs class="noFilter tabs-home-page" type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="removeTabHandle" @tab-click="setActiveTab" >
    <el-tab-pane label="主页" :closable="false" name="主页">
      <!--主界面-->
      <el-form label-width="auto" inline :model="formFilters" :rules="fromRules" ref="formFilters" :loading="queryLoading">
        <el-form-item label="免过滤名称">
            <el-input v-model="formFilters.nameQuery" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="免过滤指令ID">
            <el-input v-model="formFilters.commandIdQuery" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="下发类型" prop="statusQuery">
          <el-select v-model="formFilters.statusQuery" size="mini" placeholder="请选择下发类型">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="免过滤类型" prop="typeQuery">
					<el-select v-model="formFilters.typeQuery" size="mini" placeholder="请选择免过滤类型">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="menu-content" v-if="isShowMoreFilter">
          <el-form-item label="机房名称" prop="serviceCodeQuery">
            <el-select v-model="formFilters.serviceCodeQuery" size="mini" placeholder="请选择机房名称">
              <el-option v-for="item in houseList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="策略内容">
              <el-input v-model="formFilters.contentQuery"  size="mini"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="dateStartQuery" :editable="false">
          <el-date-picker size="mini"
                v-model="formFilters.dateStartQuery"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item> 
          <el-form-item label="指令来源" prop="cmdFlagQuery">
            <el-select v-model="formFilters.cmdFlagQuery" size="mini" placeholder="请选择指令来源">
              <el-option v-for="item in cmdSourceList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>          
          </el-form-item>           
        </div>
        <el-form-item>
            <el-button type="primary" @click="searchEvt">搜索</el-button>
            <el-button type="default" @click="czEvt">重置</el-button>
        </el-form-item>
        <div class="more-btn">
          <i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
        </div>        
      </el-form>
      <div class="parting-line"></div>
      <div class="top-operate">
        <el-button-group>
          <el-button type="default" icon="icon iconfont icon-xinzenghuizong" @click="addHandle">&nbsp;新增</el-button>
          <el-button type="default" icon="icon iconfont icon-daoru-tianchong" @click="importHandle">&nbsp;导入</el-button>
          <el-button type="default" icon="icon iconfont icon-daochu-tianchong" @click="exportHandle">&nbsp;导出</el-button>
          <el-button type="default" icon="icon iconfont icon-batch-import" :disabled="!hasSelected" @click.native="sendDispatch({type: 0})">&nbsp;批量下发</el-button>
          <el-button type="default" icon="icon iconfont icon-batch-del" :disabled="!hasSelected" @click.native="sendDispatch({type: 1})">&nbsp;批量取消下发</el-button>
        </el-button-group>
        <el-pagination @size-change="handleSizeChange" :current-page.sync="pageFilters.pageIndex"
        :page-sizes="pageSizes"
        :page-size="pageFilters.pageSize" layout="total, sizes" :total="total">
        </el-pagination>
      </div>        
      <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight" @selection-change="selectionChange">
        <el-table-column type="selection" width="45" :selectable="isDisabled"></el-table-column>
        <el-table-column label="免过滤名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="免过滤指令ID" prop="commandId"></el-table-column>
        <el-table-column label="免过滤类型" prop="type">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">域名</span>
            <span v-else-if="scope.row.type === 2">IP</span>
          </template>            
        </el-table-column>
        <el-table-column label="操作人员" prop="owner"></el-table-column>
        <el-table-column label="创建时间" prop="timeStamp"></el-table-column>
        <el-table-column label="过期时间" prop="expiredTime">
          <template slot-scope="scope">
            <span v-if="scope.row.isWu == 30">无限期</span>
            <span v-else :class="isDisabled?'red':''">{{scope.row.expiredTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下发类型" prop="statusLabel">
          <template slot-scope="scope">
            <el-tag size="mini" :type="scope.row.statusLabel === '待下发' ? 'primary' : scope.row.statusLabel === '下发'?'success':'danger'">
                {{scope.row.statusLabel}}
            </el-tag>
          </template>          
        </el-table-column>
        <el-table-column label="下发状态" prop="excstateLabel"> 
          <template slot-scope="scope">
            <el-tag v-if="scope.row.excstateLabel === '待下发'||scope.row.excstateLabel === '正在下发'||scope.row.excstateLabel === '正在取消'" size="mini" type="primary">
                {{scope.row.excstateLabel}}
            </el-tag>
            <el-tag v-else-if="scope.row.excstateLabel === '下发成功'||scope.row.excstateLabel === '部分下发成功'||scope.row.excstateLabel === '取消成功'||scope.row.excstateLabel === '部分取消成功'" size="mini" type="success">
                {{scope.row.excstateLabel}}
            </el-tag>
            <el-tag v-else size="mini" type="danger">
                {{scope.row.excstateLabel}}
            </el-tag>                      
          </template>            
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="142">
            <template slot-scope="scope">
              <div class="operate-btns">
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
            <component :is="tab.component" @removeTab="removeTabHandle"  :parentData="tab"></component>
        </keep-alive>
    </el-tab-pane>  
	</el-tabs>	
</template>

<script>
  import tableMixin from '@/mixins/tableMixin'
  import pageMixin from '@/mixins/pageMixin'
  import formMixin from '@/mixins/formMixin'
  import innerTabsMixin from '@/mixins/innerTabsMixin'
	import { getNoFilterWebInit,getNoFilterWebList,deleteList, send,batchSend,getOperation } from 'api/fufan/avoidFilterWebsite'
  import Detail from './Detail'
  import EuInfo from './EuInfo'
  import Edit from './Edit'
  import ImportTpl from './ImportTpl'

	export default {
		name: 'AvoidFilterWebsite',
    mixins: [tableMixin, pageMixin, formMixin, innerTabsMixin],
		data() {
			return {
 				formFilters: this.formFiltersInit(),
 				fromRules: {},
				statusList: [
					{ value: 0, label: '全部' },
					{ value: 1, label: '待下发' },
					{ value: 2, label: '下发' },
					{ value: 3, label: '取消' }
				],
				typeList: [
					{ value: 0, label: '全部' },
					{ value: 1, label: '域名' },
					{ value: 2, label: 'IP' }
				],
				houseList: [],
        cmdSourceList: [],
        matchModeList: [],
        tableList: [],
        tableLoading: false,
        queryLoading: false,
        total: 0,
        initQuery: {
          userId: this.$root.r_user_id
        },
        isShowMoreFilter: false,
        gap: 302,
        hasSelected: false,
        operateFilters: {
          commandIds: ''
        },  
        counter: 0
			}
		},
    created () {
      this.getInitList()
      this.getTableList()
    },  
    watch: {
      isShowMoreFilter(val) {
        this.gap = val ? 349 : 302
        this.setTableHeight()
      }
    },      
		methods: {
			 //重置
			formFiltersInit() {
				return {
          cmdFlagQuery: '',
          commandIdQuery: '',
          contentQuery:'',
          dateEndQuery: '',
          dateStartQuery: '',
          nameQuery: '',
          serviceCodeQuery: '',
          statusQuery: '',
          typeQuery: '',
          userId: this.$root.r_user_id
      	}	
			},
      //查询
      searchEvt() {
        this.getTableList()
      },  
      czEvt() {
        this.formFilters = this.formFiltersInit()
      }, 
      addHandle() {
        this.addTab({
          matchModeList: this.matchModeList,
          houseList: this.houseList,
          commandId: '',
          name: '新增',
          component: Edit
        })
      },
      importHandle() {
        this.addTab({
          houseList: this.houseList,
          commandId: '',
          name: '导入',
          component: ImportTpl
        })        
      },
      exportHandle() {

      },
      //批量下发/批量取消下发   
      sendDispatch(params) {
        params = {...params, ...this.operateFilters}
        const commandIds = this.operateFilters.commandIds
        const btnParams = []
        const indexs = []
        this.tableList.forEach( (row, index) => {
          if(commandIds.indexOf(row.commandId) > -1) {
            btnParams.push({
              commandId: row.commandId
            })
            indexs.push(index)
          }
        })
        this.sendHandle(params, btnParams, indexs, true)
      },   
      sendHandle(params, btnParams, index, isBatch) {
        // this.tableLoading = true
        console.log(11)
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
    	//获取机房,指令来源,匹配模式列表
    	getInitList() {
				this.queryLoading = true
        getNoFilterWebInit(this.initQuery).then(res => {
            if (res.status === 'success') {
                this.cmdSourceList = res.message.cmdFlagList
                this.houseList = res.message.serviceCodeList
                this.matchModeList = res.message.matchModelList
            } else {
                this.$message({
                    type: 'error',
                    message: res.message,
                    showClose: true,
                })
            }
            this.queryLoading = false
        }).catch(err => {
            this.$message({
                type: 'error',
                message: '请求不成功',
                showClose: true,
            })
            this.queryLoading = false
        })    		
    	},
      //获取列表数据
      getTableList() {
        this.tableLoading = true
        const dateQuery = this.formFilters.dateStartQuery
        if(dateQuery){
          this.formFilters.dateStartQuery = dateQuery[0]
          this.formFilters.dateEndQuery = dateQuery[1]          
        }
        const params = {...this.formFilters, ...this.pageFilters}
        getNoFilterWebList(params).then(res => {
          if( res.status === 'success') {
            this.tableList = res.message.rows
            if(this.tableList.length > 0) {
              this.tableList.forEach( item => {
                // console.log(this.reverseBtns(item.operationButton))
                item.operationButton = this.reverseBtns(item.operationButton)
                console.log(item.operationButton)
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
      btnsHandle(btn, data, index) {
        if(btn.hidden) return
        // console.log(data)
        $("body").click()
        const commandId = data.commandId
        if(btn.type === '0000') { // 详情
          this.addTab({
            name: '详情',
            idcCommandId: data.idcCommandId,
            matchModeList:  this.matchModeList,
            component: Detail
          })
        } else if(btn.type == '1') {  // 查看EU详情
          this.addTab({
            name: 'EU详情',
            commandId,
            idcCommandId: data.idcCommandId,
            houseList: this.houseList,
            component: EuInfo
          })
        } else if(btn.type == '2') {  // 下发
          this.sendHandle( {
            commandId,
            type: 0
          },[], index)
        } else if(btn.type == '3') {  // 取消下发
          this.sendHandle({
            commandId,
            type: 1
          },[], index)
        } else if(btn.type == '4') { // 编辑
          this.addTab({
            matchModeList: this.matchModeList,
            houseList: this.houseList,
            commandId,
            operationType: data.operationType,
            name: '修改',
            component: Edit
          })
        } else if(btn.type == '5') { // 删除
          this.delHandle({
            commandId,
            operationType: data.operationType
          })
        }
      },    
      delHandle(params) {
        this.$confirm('您确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
          }).then(() => {
            this.tableLoading = true
            deleteList(params).then(res => {
              const flag = res.status === 'success'
              this.$message({
                type: flag ? 'success' : 'error',
                showClose: true,
                message: res.message
              })
              if( flag ) {
                  this.getTableList()
              }              
              this.tableLoading = false
            }).catch(err => {
              this.$message({
                  type: 'error',
                  message: '请求不成功',
                  showClose: true,
              })
              this.tableLoading = false
            })              
          }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
          });     
      } ,
      //checkbox选中状态
      isDisabled (row,index){
        // console.log(row)
        let now = new Date().getTime()
        let expiredTime = new Date(row.expiredTime).getTime()
        if(expiredTime>=now || row.isWu === 30){
          return true
        }
        return false
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
      refreshSendStatus(btnParams, index) {
        getOperation(btnParams).then( res => {
          if(res.status === 'success') {
            this.counter++
            // if(res.message.operationResult === 0) {
            if(res.message.operationResult === 0 && this.counter < 5) {
              this.tableList[index].operationButton = this.reverseBtns(res.message.operationButton, true)
              setTimeout( _ => {
                this.refreshSendStatus(btnParams, index)
              }, 1000)
            } else {
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
      reverseBtns(btns, isLoading = false) {
        const operateBtns = {
          isLoading,
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
            } else if(btn.type == 3) {
              btn.text = '取消下发'
            } else if(btn.type == 5) {
              btn.text = '删除'
            }
            moreBtns.btns.push(btn)
          }
        })
        operateBtns.list.push(moreBtns)
        // console.log(operateBtns)
        return operateBtns
      },                   
		}
	}

</script>

<style src="static/css/tabsHomePage.less" lang="less" scoped></style>
<style lang="less" scoped>
  .noFilter{
    .menu-content{
      display: inline;
      // transition: all 0.5s ease;
    }
    .red{
      color: red;
    }
  }
</style> 