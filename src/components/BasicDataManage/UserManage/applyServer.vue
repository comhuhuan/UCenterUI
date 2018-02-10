<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <!--主界面-->
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="用户单位名称">
                    <el-input size="mini" v-model="fromFilters.userUnitIdQuery">
                        <el-button slot="append" @click="openForm('用户单位名称')">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="接入方式">
                    <el-select size="mini" v-model="fromFilters.seviceJoinTypeQuery" placeholder="请选择接入方式">
                        <el-option v-for="item in accessList" :key="item.ethernetId" :label="item.ethernetName" :value="item.ethernetId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否上报：">
                    <el-select size="mini" v-model="fromFilters.isReportQuery" placeholder="请选择是否上报">
                        <el-option v-for="item in reportList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvt">搜索</el-button>
                    <el-button type="default" @click="czEvt">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="parting-line"></div>
            <div class="btn-line">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增')">新增</el-button>
                    <el-button type="primary" icon="el-icon-circle-close" :disabled="allDel" @click="handleDelete(deleteIds)">批量删除</el-button>
                </el-button-group>
                <el-pagination style="float: right;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
                </el-pagination>
            </div>

            <el-table :max-height="tableMaxHeight" :data="tableList" border v-loading="isLoading" @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="业务类型：">
                                <span>{{ props.row.busType }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间：">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                            <el-form-item label="是否上报：">
                                <span v-if="props.row.isReport === 1">否</span>
                                <span v-if="props.row.isReport === 2">是</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="用户单位名称" prop="userUnitId"></el-table-column>
                <el-table-column label="服务ID" prop="serviceId"></el-table-column>
                <el-table-column label="服务内容" prop="serviceContent"></el-table-column>
                <el-table-column label="网站备案类型" prop="regType">
                </el-table-column>
                <el-table-column label="备案号/许可证号" prop="regId" show-overflow-tooltip></el-table-column>
                <el-table-column label="接入方式" prop="setMode">
                    <template slot-scope="scope">
                        <span v-if="scope.row.setMode === 1">虚拟主机</span>
                        <span v-if="scope.row.setMode === 2">主机托管</span>
                        <span v-if="scope.row.setMode === 3">整机租用</span>
                        <span v-if="scope.row.setMode === 4">其它</span>
                    </template>
                </el-table-column>
                <!--<el-table-column label="业务类型" prop="busType"></el-table-column>
                            <el-table-column label="创建时间" prop="createTime"></el-table-column>
                            <el-table-column label="是否上报" prop="isReport">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.isReport === 1">否</span>
                                    <span v-if="scope.row.isReport === 2">是</span>
                                </template>
                            </el-table-column>-->
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="editEvt(scope)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button size="small" type="text" @click="handleDelete(scope.row.serviceId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right; margin-top: 10px;" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-tab-pane>
        <el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" closable :label="tab.name">
            <keep-alive>
                <component :is="tab.component" @saveQuit="saveQuit"></component>
            </keep-alive>
        </el-tab-pane>

        <add-person v-if="addPerModal" @cancelClick="closePerForm"></add-person>
    </el-tabs>
</template>

<script>
import storage from "utils/storage";
import {
  getApplyServerManageList,
  getApplyServerManageDel,
  modeList
} from "api/dxq/UserManage";
import Add from "./Add";
import AddPerson from "./Person.vue";
import Mixin from "@/mixins/tableMixin";
import pageMixin from "@/mixins/pageMixin"; //分页
import { mapActions } from "vuex";
export default {
  name: "ApplyServerManage",
  mixins: [Mixin, pageMixin],
  components: { AddPerson },
  data() {
    return {
      fromFilters: this.fromFiltersInit(),
      allDel: true,
      deleteIds: "",
      fromRules: {},
      accessList: [],
      reportList: [
        { value: 0, label: "已上报" },
        { value: 1, label: "未上报" }
      ],
      tableList: [],
      isLoading: false,
      tabs_list: [],
      addPerModal: false,
      total: 100,
      isShowMoreFilter: false,
      gap: 302
    };
  },
  created() {
    this.getTableList();
    this.selectEvt();
  },
  watch: {
    isShowMoreFilter(val) {
      this.gap = val ? 349 : 302;
      this.setTableHeight();
    }
  },
  methods: {
    ...mapActions([
      "setUserData",
      "setServerData",
      "setAdd",
      "setEdit",
      "setActive",
      "setIsUser",
      "setStep",
      "setIsServer",
      "setIsRoom"
    ]),
    fromFiltersInit() {
      return {
        userUnitIdQuery: "",
        seviceJoinTypeQuery: "",
        isReportQuery: ""
      };
    },
    //查询
    searchEvt() {
      this.getTableList();
    },
    //重置
    czEvt() {
      this.fromFilters = this.fromFiltersInit();
    },
    getTableList() {
      this.isLoading = true;
      const params = { ...this.fromFilters, ...this.pageFilters };
      getApplyServerManageList(params)
        .then(res => {
          if (res.status === "success") {
            this.tableList = res.message.rows;
          } else {
            this.$message({
              type: "error",
              message: res.message,
              showClose: true
            });
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求不成功",
            showClose: true
          });
          this.isLoading = false;
        });
    },
    addEvt(val) {
      this.tabs_list = [];
      let exist = false;
      this.tabs_list.some(item => {
        if (item.name === val) {
          exist = true;
          return true;
        }
        return false;
      });

      if (!exist) {
        if (val == "新增") {
          this.tabs_list.push({
            name: val,
            component: Add
          });
          this.setUserData({});
          this.setServerData({
            userId: "",
            serviceContent: "",
            regType: "",
            regId: "",
            setMode: "",
            busType: "",
            domain: [
              {
                value: ""
              }
            ]
          });

          this.setAdd(true);
          this.setEdit(false);
          this.setActive(2);
          this.setIsServer(true);
          this.setIsUser(false);
          this.setIsRoom(false);
          this.$emit("tabDis");
          this.setStep(2);
        }
        this.activeName = val;
      } else {
        this.activeName = val;
        this.$emit("tabDis");
      }
    },
    editEvt(scope) {
      this.tabs_list = [];
      let rowNum = scope.$index + 1;
      let name = "行" + rowNum + "-修改";
      let exist = false,
        newEdit = false,
        preName = "";
      this.tabs_list.some(item => {
        if (item.name === name) {
          exist = true;
        }
        if (item.name.indexOf("修改") > -1) {
          newEdit = true;
          preName = item.name;
        }
        return false;
      });
      if (!exist) {
        if (newEdit) {
          this.tabs_list.forEach(item => {
            if (item.name === preName) {
              item.name = name;
              item.component = Add;

              storage.set("server", scope.row);
              this.setAdd(false);
              this.setEdit(true);
              this.setActive(2);
              this.setIsServer(true);
              this.setIsUser(false);
              this.setIsRoom(false);
              this.$emit("tabDis");
              this.setStep(2);
            }
          });
        } else {
          storage.set("server", scope.row);
          this.setAdd(false);
          this.setEdit(true);
          this.setActive(2);
          this.setIsServer(true);
          this.setIsUser(false);
          this.setIsRoom(false);
          this.$emit("tabDis");
          this.setStep(2);

          this.tabs_list.push({
            name: name,
            component: Add
          });
        }
      }
      this.activeName = name;
    },
    tabRemove(tabName) {
      const newTabs = [];
      this.tabs_list.forEach(item => {
        if (item.name !== tabName) {
          newTabs.push(item);
        }
      });
      this.activeName = "主页";
      this.tabs_list = newTabs;
      this.$emit("tabShow");
    },
    tabClick(tab) {
      this.activeName = tab.name;
      if (tab.name == "主页") {
        this.$emit("tabShow");
      } else {
        this.$emit("tabDis");
      }
    },
    saveQuit() {
      this.activeName = "主页";
      this.tabs_list = [];
      this.$emit("tabShow");
      //刷新列表
      this.getTableList();
    },
    //批量删除
    handleDelete(params) {
      console.log(params);
      var par = { deleteIds: params };
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.isLoading = true;
          //用户ID  deleteIds
          getApplyServerManageDel(par)
            .then(res => {
              this.isLoading = false;
              this.$message({
                showClose: true,
                message: res.message,
                type: res.status == "success" ? "success" : "error"
              });
              if (res.status === "success") {
                this.getTableList();
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "请求不成功",
                showClose: true
              });
              this.isLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.allDel = false;
      if (val.length > 0) {
        const ids = [];
        val.forEach(item => {
          ids.push(item.serviceId);
        });
        this.deleteIds = ids.join(",");
      }
    },
    //查询弹窗
    openForm(name) {
      this.addPerModal = true;
      storage.set("formTitle", name);
      storage.remove("rowData");
    },
    closePerForm() {
      this.addPerModal = false;
      if (storage.get("rowData")) {
        this.fromFilters.userUnitIdQuery = storage.get("rowData").userUnitName;
      }
    },
    //下拉框
    selectEvt() {
      modeList()
        .then(res => {
          if (res.status === "success") {
            this.accessList = res.message;
          } else {
            this.$message({
              type: "error",
              message: res.message,
              showClose: true
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求不成功",
            showClose: true
          });
        });
    }
  }
};
</script>

<style lang="less">
.el-form.el-form--inline .el-input {
  vertical-align: top;
}
</style>
