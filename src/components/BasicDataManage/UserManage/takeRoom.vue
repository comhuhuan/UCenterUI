<template>
    <el-tabs type="border-card" tab-position="bottom" :activeName="activeName" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane label="主页" :closable="false" name="主页">
            <el-form label-width="auto" inline :model="fromFilters" :rules="fromRules" ref="fromFilters">
                <el-form-item label="机房名称：" >
                    <el-select size="mini" v-model="fromFilters.houseCodeQuery" placeholder="请选择机房名称">
                        <el-option v-for="item in houseList" :key="item.houseCode" :label="item.houseName" :value="item.houseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户：" >
                    <el-input size="mini" v-model="fromFilters.userIdQuery">
                        <el-button slot="append" @click="openForm('用户单位名称')">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="所属机架：" >
                    <el-input size="mini" v-model="fromFilters.cabidQuery" placeholder="请输入所属机架"></el-input>
                </el-form-item>
                <el-form-item label="服务ID：" >
                    <el-input size="mini" v-model="fromFilters.serviceIdQuery" placeholder="请输入服务ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvt">搜索</el-button>
                    <el-button type="default" @click="czEvt">重置</el-button>
                </el-form-item>
                <div class="more-filter" v-if="isShowMoreFilter">
                    <el-form-item label="接入方式">
                        <el-select size="mini" v-model="fromFilters.seviceJoinTypeQuery" placeholder="请选择接入方式">
                            <el-option v-for="item in accessList" :key="item.ethernetId" :label="item.ethernetName" :value="item.ethernetId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户类型：">
                        <el-select size="mini" v-model="fromFilters.userTypeQuery" placeholder="请选择用户类型">
                            <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="占用IP：">
                        <el-input size="mini" v-model="fromFilters.occupyIpQuery" placeholder="请输入服务ID"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上报：">
                        <el-select size="mini" v-model="fromFilters.isReportQuery" placeholder="请选择是否上报">
                            <el-option v-for="item in reportList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="more-btn">
                    <i class="el-icon-arrow-down" :class="{'is-reverse': isShowMoreFilter}" title="更多选项" @click="isShowMoreFilter = !isShowMoreFilter"></i>
                </div>
            </el-form>
            <div class="parting-line"></div>
            <div class="btn-line">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="addEvt('新增')">新增</el-button>
                    <el-button type="primary" :disabled="allDel" icon="el-icon-delete" @click="handleDelete(deleteIds)">批量删除</el-button>
                </el-button-group>
                <el-pagination style="float: right;" @size-change="handleSizeChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="total, sizes" :total="total">
                </el-pagination>
            </div>
            <el-table :max-height="tableMaxHeight" :data="tableList" border :loading="isLoading"  @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="机柜信息：">
                                <span>{{ props.row.cabinetId }}</span>
                            </el-form-item>
                            <el-form-item label="资源分配时间：">
                                <span>{{ props.row.resAllotTime }}</span>
                            </el-form-item>
                            <el-form-item label="带宽类型：">
                                <span>{{ props.row.bandwidth}}</span>
                            </el-form-item>
                            <el-form-item label="是否上报：">
                                <span v-if="props.row.isReport === 1">否</span>
                                <span v-if="props.row.isReport === 2">是</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="机房名称" prop="houseCode"></el-table-column>
                <el-table-column label="用户单位名称" prop="userUnitId"></el-table-column>
                <el-table-column label="服务ID" prop="serviceId"></el-table-column>
                <el-table-column label="服务内容" prop="serviceContent"></el-table-column>
                <el-table-column label="服务接入方式" prop="seviceJoinType">
                    <template slot-scope="scope">
                        <el-tag size="small" v-if="scope.row.seviceJoinType === 0">专线</el-tag>
                        <el-tag size="small" v-if="scope.row.seviceJoinType === 1">虚拟主机</el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column label="机柜信息" prop="cabinetId"></el-table-column>
                                <el-table-column label="资源分配时间" prop="resAllotTime"></el-table-column>
                                <el-table-column label="带宽类型" prop="bandwidth"></el-table-column>
                                <el-table-column label="是否上报" prop="isReport"></el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editEvt(scope)">修改</el-button>
                        <span style="color: #20a0ff;"> | </span>
                        <el-button type="text" size="small" @click="handleDelete(scope.row.houseCode)">删除</el-button>
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
import {
  getTakeUpRoomList,
  getTakeUpRoomDel,
  houseList,
  modeList
} from "api/dxq/UserManage";
import storage from "utils/storage";
import AddPerson from "./Person.vue";
import Add from "./Add";
import Mixin from "@/mixins/tableMixin";
import pageMixin from "@/mixins/pageMixin"; //分页
import { mapActions } from "vuex";
export default {
  name: "TakeUpRoom",
  mixins: [Mixin, pageMixin],
  components: { AddPerson },
  data() {
    return {
      fromFilters: this.fromFiltersInit(),
      allDel: true,
      deleteIds: "",
      fromRules: {},
      houseList: [],
      userList: [
        { value: 1, label: "提供应用服务的用户" },
        { value: 2, label: "其它用户" }
      ],
      reportList: [
        { value: 0, label: "已上报" },
        { value: 1, label: "未上报" }
      ],
      accessList: [],
      tableList: [],
      tabs_list: [],
      isLoading: false,
      addPerModal: false,
      total: 100,
      isShowMoreFilter: false,
      gap: 302
    };
  },
  created() {
    //  console.log('Mixin', Mixin)
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
      "setRoomData",
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
        cabidQuery: "", // 所属机架 string
        houseCodeQuery: "", //  机房名称 string 通过机房编号获取机房名称
        isReportQuery: "", //  是否上报 string 下拉框【0=已上报,1=未上报】
        occupyIpQuery: "", //  占用Ip string
        serviceIdQuery: "", //  服务Id string
        seviceJoinTypeQuery: "", //  服务接入方式 string 下拉框【0.专线；1.虚拟主机；2.主机托管；3.整机租用；999.其他】
        userIdQuery: "", //  用户 string
        userTypeQuery: "" //
      };
    },
    getTableList() {
      this.isLoading = true;
      const params = { ...this.fromFilters, ...this.pageFilters };
      getTakeUpRoomList(params)
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
        console.log(item);
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
          this.setRoomData({});
          this.$emit("tabDis");
          this.setAdd(true);
          this.setEdit(false);
          this.setActive(3);
          this.setIsRoom(true);
          this.setIsUser(false);
          this.setIsServer(false);
          this.setStep(3);
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

              storage.set("val", scope.row);
              this.$emit("tabDis");
              this.setAdd(false);
              this.setEdit(true);
              this.setActive(3);
              this.setIsRoom(true);
              this.setIsUser(false);
              this.setIsServer(false);
              this.setStep(3);
            }
          });
        } else {
          storage.set("val", scope.row);
          this.$emit("tabDis");
          this.setAdd(false);
          this.setEdit(true);
          this.setActive(3);
          this.setIsRoom(true);
          this.setIsUser(false);
          this.setIsServer(false);
          this.setStep(3);

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
          getTakeUpRoomDel(par)
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
          ids.push(item.houseCode);
        });
        this.deleteIds = ids.join(",");
      }
    },
    //下拉框
    selectEvt() {
      houseList()
        .then(res => {
          if (res.status === "success") {
            this.houseList = res.message;
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
    },
    //打开用户弹窗
    openForm(name) {
      this.addPerModal = true;
      storage.set("formTitle", name);
      storage.remove("rowData");
    },
    closePerForm() {
      this.addPerModal = false;
      if (storage.get("rowData")) {
        this.fromFilters.userIdQuery = storage.get("rowData").userUnitName;
      }
    },
    //查询
    searchEvt() {
      this.getTableList();
    },
    //重置
    czEvt() {
      this.fromFilters = this.fromFiltersInit();
    }
  }
};
</script>
<style lang="less" scoped>
.el-tabs {
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
