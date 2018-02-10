<template>
	<el-tabs class="tabs-home-page" type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="removeTabHandle" @tab-click="setActiveTab">
		<el-tab-pane label="主页" :closable="false" name="主页" :loading="initLoading">
			<el-form label-width="auto" inline :model="formFilter" ref="formFilter">
				<el-form-item label="违法网站名称：" prop="nameQuery">
					<el-input size="mini" placeholder="请输入违法网站名称" v-model="formFilter.nameQuery" ></el-input>
				</el-form-item>
				<el-form-item label="违法网站指令ID：" prop="commandIdQuery">
                    <el-input size="mini" placeholder="请输入违法网站指令ID" v-model="formFilter.commandIdQuery" ></el-input>
				</el-form-item>
                <el-form-item label="下发状态：" prop="statusQuery">
                    <el-select size="mini" v-model="formFilter.statusQuery" placeholder="请选择下发类型">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="违法网站类型：" prop="typeQuery">
                    <el-select size="mini" v-model="formFilter.typeQuery" placeholder="请选择违法网站类型">
                        <el-option v-for="item in typeQueryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机房名称：" prop="serviceCodeQuery" v-if="isShowMoreFilter">
                    <el-select size="mini" v-model="formFilter.serviceCodeQuery" placeholder="请选择机房名称">
                        <el-option v-for="item in serviceCodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="策略内容：" prop="contentQuery" v-if="isShowMoreFilter">
                    <el-input size="mini" placeholder="请输入策略内容" v-model="formFilter.contentQuery" ></el-input>
                </el-form-item>
                <el-form-item label="指令来源：" prop="cmdFlagQuery" v-if="isShowMoreFilter">
                    <el-select size="mini" v-model="formFilter.cmdFlagQuery" placeholder="请选择下发类型">
                        <el-option v-for="item in cmdFlagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="起止时间：" prop="dateRange" :editable="false" v-if="isShowMoreFilter">
					<el-date-picker size="mini"
				      	v-model="dateRange"
				      	type="daterange"
				      	range-separator="至"
				      	start-placeholder="开始日期"
				      	end-placeholder="结束日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTableList" :disabled="authorizeBtns.indexOf('1') === -1" :title="authorizeBtns.indexOf('1') === -1 ? '无权限操作' : ''">搜索</el-button>
					<el-button type="primary" @click="resetForm('formFilter')">重置</el-button>
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
                    <el-button type="default" icon="icon iconfont icon-batch-import" :disabled="!hasSelected" @click.native="blockDispatch({type: 0})">&nbsp;批量处置</el-button>
                    <el-button type="default" icon="icon iconfont icon-batch-del" :disabled="!hasSelected" @click.native="blockDispatch({type: 1})">&nbsp;批量取消处置</el-button>
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
import tableMixin from "@/mixins/tableMixin";
import pageMixin from "@/mixins/pageMixin";
import formMixin from "@/mixins/formMixin";
import innerTabsMixin from "@/mixins/innerTabsMixin";
import {
  getInitData,
  getList,
  del,
  send,
  getOperation,
  block
} from "api/dxq/illWebsite";
import Edit from "./Edit";
import Detail from "./Detail";
import EUDetail from "./EUDetail";
import BlockDetail from "./BlockDetail";
import Import from "./Import";
import fecha from "fecha";

export default {
  name: "InfoFilter",
  mixins: [tableMixin, pageMixin, formMixin, innerTabsMixin],
  props: {
    authorizeBtns: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      formFilter: {
        cmdFlagQuery: "", // 指令来源 number 【下拉框{初始化请求获取}】
        commandIdQuery: "", //  违法网站指令ID string
        contentQuery: "", //  策略内容 string
        dateEndQuery: "", //  结束时间 string yyyy-MM-dd
        dateStartQuery: "", //  开始时间 string yyyy-MM-dd
        nameQuery: "", //  违法网站名称 string
        serviceCodeQuery: "", //  机房名称 string 【下拉框{初始化请求获取}】
        statusQuery: "", //  下发类型 number 【下拉框{1=待下发,2=下发,3=取消}】
        typeQuery: "", //
        userId: this.$root.r_user_id
      },
      statusList: [
        { label: "全部", value: "" },
        { label: "待下发", value: 1 },
        { label: "下发", value: 2 },
        { label: "取消", value: 3 }
      ],
      columns: [
        { label: "违法网站名称", prop: "name", hidden: false },
        { label: "违法网站指令ID", prop: "commandId", hidden: false },
        { label: "违法网站类型", prop: "type", hidden: false },
        { label: "违法违规情况", prop: "illegalType", hidden: false },
        { label: "操作人员", prop: "owner", hidden: false },
        { label: "创建时间", prop: "timeStamp", hidden: false },
        { label: "过期时间", prop: "expiredTime", hidden: false },
        { label: "监测状态", prop: "statusLable", hidden: false },
        { label: "封堵状态", prop: "excstateLable", hidden: false },
        {
          label: "处置",
          prop: "operationButton",
          fixed: "right",
          width: 180,
          hidden: false
        }
      ],
      isShowMoreFilter: false,
      userId: this.$root.r_user_id,
      initLoading: false,
      tableLoading: false,

      cmdFlagList: [],
      illegalTypeList: [],
      typeQueryList: [{ label: "域名", value: 1 }, { label: "IP", value: 2 }],
      serviceCodeList: [],
      matchModelList: [],
      matchRangeList: null,

      tableList: null,
      hasSelected: false,
      selectedList: [],
      operateFilters: {
        commandIds: ""
      },
      gap: 302,
      counter: 0,
      dateRange: [],
      selectHeaderFields: [
        "name",
        "commandId",
        "type",
        "illegalType",
        "owner",
        "timeStamp",
        "expiredTime",
        "statusLable",
        "excstateLable"
      ]
    };
  },
  created() {
    console.log(this.authorizeBtns);
    this.getInitData();
    this.getTableList();
  },
  mounted() {},
  watch: {
    isShowMoreFilter(val) {
      this.gap = val ? 349 : 302;
      this.setTableHeight();
    }
  },
  methods: {
    getInitData() {
      this.initLoading = true;
      getInitData({ userId: this.userId })
        .then(res => {
          if (res.status === "success") {
            this.cmdFlagList = res.message.cmdFlagList;
            this.illegalTypeList = res.message.illegalTypeList;
            this.serviceCodeList = res.message.serviceCodeList;
            this.matchModelList = res.message.matchModelList;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
          this.initLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.initLoading = false;
        });
    },
    getTableList() {
      this.tableLoading = true;
      if (this.dateRange && this.dateRange.length > 0) {
        this.formFilter.dateStartQuery =
          this.dateRange[0] && fecha.format(this.dateRange[0], "YYYY-MM-DD");
        this.formFilter.dateEndQuery =
          this.dateRange[1] && fecha.format(this.dateRange[1], "YYYY-MM-DD");
      }
      const params = { ...this.formFilter, ...this.pageFilters };
      getList(params)
        .then(res => {
          if (res.status === "success") {
            this.tableList = res.message.rows;
            if (this.tableList.length > 0) {
              this.tableList.forEach(item => {
                if (item.isWu == 30) {
                  item.expiredTime = "无期限";
                } else {
                }
                var c = item.disposeButton.concat(item.operationButton);
                item.operationButton = this.reverseBtns(c);
              });
            }

            this.total = res.message.total;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    resetForm() {
      this.dateRange = [];
    },
    reverseBtns(btns, isLoading = false) {
      const operateBtns = {
        isLoading,
        list: [
          {
            hidden: false,
            text: "详情",
            type: "0000",
            title: "查看详情"
          }
        ]
      };
      const moreBtns = { type: "9999", text: "更多", btns: [] };
      btns.forEach(btn => {
        if (btn.type == 3) {
          btn.text = "编辑";
          operateBtns.list.push(btn);
        } else if (btn.type == 4) {
          btn.text = "删除";
          operateBtns.list.push(btn);
        } else {
          if (btn.type == 1) {
            btn.text = "下发监测";
          } else if (btn.type == 2) {
            btn.text = "取消下发";
          } else if (btn.type == 5) {
            btn.text = "查看EU";
          } else if (btn.type == 6) {
            btn.text = "处置";
          } else if (btn.type == 7) {
            btn.text = "取消处置";
          } else if (btn.type == 8) {
            btn.text = "查看处置记录";
          }
          moreBtns.btns.push(btn);
        }
      });
      operateBtns.list.push(moreBtns);
      // console.log(operateBtns)
      return operateBtns;
    },
    refreshSendStatus(btnParams, index) {
      getOperation(btnParams)
        .then(res => {
          if (res.status === "success") {
            this.counter++;
            // if(res.message.operationResult === 0) {
            if (res.message.operationResult === 0 && this.counter < 10) {
              var aBtn = res.message.operationButton.concat(
                res.message.disposeButton
              );
              this.tableList[index].operationButton = this.reverseBtns(
                aBtn,
                true
              );
              setTimeout(_ => {
                this.refreshSendStatus(btnParams, index);
              }, 1000);
            } else {
              var aBtn = res.message.operationButton.concat(
                res.message.disposeButton
              );
              this.tableList[index].operationButton = this.reverseBtns(aBtn);
            }
          } else {
            this.$message({
              type: "error",
              message: res.message,
              showClose: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    btnsHandle(btn, data, index) {
      if (btn.hidden) return;
      $("body").click();
      if (btn.type === "0000") {
        // 详情
        this.addTab({
          name: "详情",
          idcCommandId: data.idcCommandId,
          cmdFlag: data.cmdFlag,
          component: Detail
        });
      } else if (btn.type == "1") {
        // 下发监测
        this.sendHandle(
          {
            commandId: data.commandId,
            type: 0
          },
          {
            commandId: data.commandId,
            idcCommandId: data.idcCommandId
          },
          index
        );
      } else if (btn.type == "2") {
        // 取消下发
        this.sendHandle(
          {
            commandId: data.commandId,
            type: 1
          },
          {
            commandId: data.commandId,
            idcCommandId: data.idcCommandId
          },
          index
        );
      } else if (btn.type == "5") {
        // 查看EU
        this.addTab({
          name: "EU详情",
          commandId: data.commandId,
          idcCommandId: data.idcCommandId,
          serviceCodeList: this.serviceCodeList,
          component: EUDetail
        });
      } else if (btn.type == "8") {
        // 查看处置记录
        this.addTab({
          name: "处置记录",
          idcCommandId: data.idcCommandId,
          component: BlockDetail
        });
      } else if (btn.type == "6") {
        // 处置
        this.blockHandle(
          {
            commandId: data.commandId,
            type: 0
          },
          {
            commandId: data.commandId,
            idcCommandId: data.idcCommandId
          },
          index
        );
      } else if (btn.type == "7") {
        // 取消处置
        this.blockHandle(
          {
            commandId: data.commandId,
            type: 1
          },
          {
            commandId: data.commandId,
            idcCommandId: data.idcCommandId
          },
          index
        );
      } else if (btn.type == "3") {
        //修改
        this.addTab({
          matchModelList: this.matchModelList,
          serviceCodeList: this.serviceCodeList,
          illegalTypeList: this.illegalTypeList, //违法违规情况
          commandId: data.commandId,
          operationType: data.operationType,
          name: "修改",
          component: Edit
        });
      } else if (btn.type == "4") {
        // 删除
        this.delHandle({
          commandId: data.commandId,
          operationType: data.operationType
        });
      }
    },
    selectHeaderFieldsHandle(val) {
      this.columns.forEach(col => {
        if (col.prop !== "operationButton") {
          col.hidden = !val.includes(col.prop);
        }
      });
    },
    selectionChange(selection) {
      // console.log(selection)
      this.hasSelected = false;
      if (selection.length > 0) {
        this.hasSelected = true;
        const ids = [];
        selection.forEach(item => {
          ids.push(item.commandId);
        });
        this.operateFilters.commandIds = ids.join(",");
      }
    },
    setIsSelectable(row, index) {
      // console.log(row)
      return (
        new Date(row.expiredTime).getTime() > Date().now ||
        row.expiredTime === "无期限"
      );
    },
    sendDispatch(params) {
      params = { ...params, ...this.operateFilters };
      const commandIds = this.operateFilters.commandIds;
      const btnParams = [];
      const indexs = [];
      this.tableList.forEach((col, index) => {
        if (commandIds.indexOf(col.commandId) > -1) {
          btnParams.push({
            commandId: col.commandId,
            idcCommandId: col.idcCommandId
          });
          indexs.push(index);
        }
      });
      this.sendHandle(params, btnParams, indexs, true);
    },
    sendHandle(params, btnParams, index, isBatch) {
      console.log(params);
      this.tableLoading = true;
      send(params)
        .then(res => {
          if (res.status === "success") {
            this.counter = 0;
            if (isBatch) {
              //如果是批量下发
              btnParams.forEach((item, i) => {
                this.refreshSendStatus(item, index[i]);
              });
            } else {
              this.refreshSendStatus(btnParams, index);
            }
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    blockDispatch(params) {
      params = { ...params, ...this.operateFilters };
      const commandIds = this.operateFilters.commandIds;
      const btnParams = [];
      const indexs = [];
      this.tableList.forEach((col, index) => {
        if (commandIds.indexOf(col.commandId) > -1) {
          btnParams.push({
            commandId: col.commandId,
            idcCommandId: col.idcCommandId
          });
          indexs.push(index);
        }
      });
      this.blockHandle(params, btnParams, indexs, true);
    },
    blockHandle(params, btnParams, index, isBatch) {
      console.log(params);
      this.tableLoading = true;
      block(params)
        .then(res => {
          if (res.status === "success") {
            this.counter = 0;
            if (isBatch) {
              //如果是批量
              btnParams.forEach((item, i) => {
                this.refreshSendStatus(item, index[i]);
              });
            } else {
              this.refreshSendStatus(btnParams, index);
            }
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    delHandle(params) {
      this.$confirm("请确认是否删除此条信息吗？", "提示", {
        comfirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          this.tableLoading = true;
          del(params)
            .then(res => {
              const flag = res.status === "success";
              this.$message({
                type: flag ? "success" : "error",
                message: flag ? "删除成功" : res.message,
                showClose: true
              });
              if (flag) {
                this.getTableList();
              }
              this.tableLoading = false;
            })
            .catch(err => {
              console.log(err);
              this.tableLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
            showClose: true
          });
        });
    },
    addHandle() {
      this.addTab({
        matchModelList: this.matchModelList,
        serviceCodeList: this.serviceCodeList,
        illegalTypeList: this.illegalTypeList, //违法违规情况
        commandId: "",
        name: "新增",
        component: Edit
      });
    },
    importHandle() {
      this.addTab({
		illegalTypeList: this.illegalTypeList, //违法违规情况
        commandId: "",
        name: "导入",
        component: Import
      });
    },
    exportHandle() {}
  }
};
</script>

<style src="static/css/tabsHomePage.less" lang="less" scoped></style>
