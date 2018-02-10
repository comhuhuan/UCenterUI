<template>
    <section id="roomItem">
        <div :class="{'form1':roomEdit==true,'form2':roomEdit==false}">
            <PanelHead :options="panelForm"></PanelHead>
            <br>
            <el-form :model="roomData" :rules="addRule" ref="roomData" label-width="160px">
            <el-form-item label="所属用户：" prop="userId">
                <el-input size="mini" v-model="roomData.userId" placeholder="所属用户" :disabled="userInputRead||disable">
                    <el-button slot="append" @click="openForm('所属用户')" :disabled="userInputRead||disable">选择</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="所属服务：" prop="serviceId" v-if="isServerShow||serverInputShow">
                <el-select size="mini" label="所属服务：" v-model="roomData.serviceId" placeholder="请选择所属服务" @change="serverEvt">
                    <el-option v-for="item in theServerList" :key="item.content" :label="item.content" :value="item.content">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机房：" prop="houseCode">
                <el-select size="mini" label="所属机房：" v-model="roomData.houseCode" placeholder="请选择所属机房" @change="houseChange">
                    <el-option v-for="item in roomLists" :key="item.houseCode" :label="item.houseName" :value="item.houseCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属片区：" prop="houseArea">
                <el-select size="mini" label="所属片区：" v-model="roomData.houseArea" placeholder="请选择所属片区" @change="areaChange">
                    <el-option v-for="item in houseAreaList" :key="item.roomCode" :label="item.roomName" :value="item.roomCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机柜：" prop="cabinetId">
                <el-select size="mini" label="所属机柜：" v-model="roomData.cabinetId" placeholder="请选择所属机柜">
                    <el-option v-for="item in cabinetIdList" :key="item.cabCode" :label="item.cabName" :value="item.cabCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="虚拟主机名称：" prop="virtualName" v-if="isVirtual">
                <el-input size="mini" v-model="roomData.virtualName" placeholder="请输入虚拟主机名称">
                </el-input>
            </el-form-item>
            <el-form-item label="虚拟主机状态：" prop="virtualStatus" v-if="isVirtual">
                <el-select size="mini"  v-model="roomData.virtualStatus" placeholder="请选择虚拟主机状态">
                    <el-option v-for="item in virtualStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="虚拟主机类型：" prop="virtualType" v-if="isVirtual">
                <el-select size="mini"  v-model="roomData.virtualType" placeholder="请选择虚拟主机类型">
                    <el-option v-for="item in virtualTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="虚拟主机网络地址：" prop="virtualNetAddr" v-if="isVirtual">
                <el-input size="mini" v-model="roomData.virtualNetAddr" placeholder="请输入虚拟主机网络地址">
                </el-input>
            </el-form-item>
            <el-form-item label="虚拟主机管理地址：" prop="virtualPhyAddr" v-if="isVirtual">
                <el-input size="mini" v-model="roomData.virtualPhyAddr" placeholder="请输入虚拟主机管理地址">
                </el-input>
            </el-form-item>

            <el-form-item label="网络带宽：" prop="bandwidth">
                <el-input size="mini" v-model="roomData.bandwidth" placeholder="请输入网络带宽">
                    <template slot="append">MB</template>
                </el-input>
            </el-form-item>
            <el-form-item label="服务器IP：" prop="serviceIp">
                <el-tooltip class="item" effect="dark" content='格式：外网|内网 12.12.12.12-12.12.12.13|192.1.1.1-192.1.1.3
                                                                                                                                                或只有外网 12.12.12.1-12.12.12.2;12.12.12.3-12.12.12.4|192.1.1.4-192.1.1.5
                                                                                                                                                多个用（英文状态)";"分号隔离' placement="top">
                    <el-input size="mini" v-model="roomData.serviceIp" type="textarea" :rows="3" placeholder="">
                    </el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="服务器日期：" prop="dateRange">
                <el-date-picker size="mini" v-model="roomData.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="服务器描述：" prop="serviceDesc">
                <el-tooltip class="item" effect="dark" content='	注：服务器型号、操作系统、硬盘描述、CPU描述、内存描述和服务器描述最大长度不能超过255个字符' placement="top">
                    <el-input size="mini" v-model="roomData.serviceDesc" type="textarea" :rows="3" placeholder="">
                    </el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="">
                <el-button-group>
                    <el-button type="primary" @click="submitForm('roomData')">确定</el-button>
                    <el-button type="primary" @click="preEvt('roomData')">上一步</el-button>
                    <el-button type="primary" @click="returnEvt">退出</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        </div>
        <div class="list" v-loading="listLoading" v-show="roomEdit">
            <PanelHead :options="panelOpt">
            </PanelHead>
            <div class="serverBox" v-for="(item,index) in roomList" :key="item.id" >
                <div class="wrapper" @click="editHandle(index, item)" :class="{'active':index==activeNum}">
                    <div class="operate">
                        <span title="编辑" class="icon iconfont icon-xiugai1" @click="editHandle(index, item)"></span>
                        <span title="删除" class="icon iconfont icon-shanchu" @click="delHandle(index, item)"></span>
                    </div>
                    <div class="content">
                        <ul>
                            <li :title="item.cabId"><span class="label">所属用户：</span><span class="value">{{item.userUnitId}}</span></li>
                            <li :title="item.cabId"><span class="label">机房名称：</span><span class="value">{{item.serviceContent}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <add-person v-if="addPerModal" @cancelClick="closePerForm"></add-person>
    </section>
</template>

<script>
import AddPerson from "./Person.vue";
import storage from "utils/storage";
import { mapActions, mapState } from "vuex";
import {
  RoomDetail,
  UserDetail,
  ServerDetail,
  getTakeUpRoomList,
  getTakeUpRoomDel,
  houseList,
  houseAreaList,
  cabinetIdList,
  theServer
} from "api/dxq/UserManage";
import PanelHead from "components/Common/PanelHead";
import fecha from "fecha";
import { ipReg } from "constants/reg";
export default {
  name: "AddTakeUpRoom",
  components: { AddPerson, PanelHead },
  data() {
    return {
      activeNum: "",
      roomEdit: true,
      disable: false,
      addPerModal: false,
      isServerShow: false,
      virtualStatusList: [
        { value: 1, label: "使用中" },
        { value: 2, label: "停用" },
        { value: 3, label: "其它" }
      ],
      virtualTypeList: [
        { value: 1, label: "共享式" },
        { value: 2, label: "专用式" },
        { value: 3, label: "云虚拟" },
        { value: 4, label: "其它" }
      ],
      roomLists: [],
      houseAreaList: [],
      cabinetIdList: [],
      theServerList: [],
      addRule: {
        userId: [
          { required: true, message: "请选择所属用户", trigger: "blur" }
        ],
        serviceId: [
          { required: true, message: "请选择所属服务", trigger: "blur" }
        ],
        houseCode: [
          { required: true, message: "请选择所属机房", trigger: "change" }
        ],
        houseArea: [
          { required: true, message: "请选择所属片区", trigger: "change" }
        ],
        cabinetId: [
          { required: true, message: "请选择所属机柜", trigger: "change" }
        ],

        virtualName: [
          { required: true, message: "请输入虚拟主机名称", trigger: "blur" }
        ],
        virtualStatus: [
          { required: true, message: "请选择虚拟主机状态", trigger: "change" }
        ],
        virtualType: [
          { required: true, message: "请选择虚拟主机类型", trigger: "change" }
        ],
        virtualNetAddr: [
          {
            required: true,
            message: "请输入虚拟主机网络地址",
            trigger: "blur"
          },
          {
            message: "请输入正确的虚拟主机网络地址,如：192.168.123.123",
            pattern: ipReg,
            trigger: "blur"
          }
        ],
        virtualPhyAddr: [
          {
            required: true,
            message: "请输入虚拟主机管理地址",
            trigger: "blur"
          },
          {
            message: "请输入正确的虚拟主机网络地址,如：192.168.123.123",
            pattern: ipReg,
            trigger: "blur"
          }
        ],

        bandwidth: [
          { required: true, message: "请输入网络带宽", trigger: "blur" }
        ],
        serviceIp: [
          { required: true, message: "请输入服务器IP", trigger: "blur" },
          { message: "请输入正确的服务器IP", pattern: ipReg, trigger: "blur" }
        ],
        dateRange: [
          {
            type: "array",
            required: true,
            message: "请输入服务器开始日期和结束日期",
            trigger: "blur"
          }
        ]
      },
      roomList: [],
      panelOpt: {
        title: "机房列表"
      },
      panelForm: { title: "占用机房信息" },
      listLoading: false,
      isVirtual: false
    };
  },
  created() {
    if (this.activeId == 3) {
      this.houseEvt();
      if (this.isAdd == true) {
        this.setUserInputRead(false);
        this.setServerInputShow(false);
        this.panelForm = { title: "新增占用机房" };
      } else if (this.isEdit == true) {
        this.panelForm = { title: "修改占用机房" };
        //去掉右侧机房列表
        this.roomEdit = false;
        if (storage.get("val")) {
          if (storage.get("val").serviceContent.length > 0) {
            this.isServerShow = true;
          }
          if (storage.get("val").seviceJoinType == 1) {
            this.isVirtual = true;
          }
        }
        this.setServerInputShow(false);
        this.setUserRead(true);
        this.setServerRead(true);

        var json = {
          userId: storage.get("val").userId,
          serviceId: storage.get("val").serviceId,
          houseCode: storage.get("val").houseCode,
          houseArea: storage.get("val").houseArea,
          cabinetId: storage.get("val").cabinetId,
          virtualName: storage.get("val").virtualName,
          virtualStatus: storage.get("val").virtualStatus,
          virtualType: storage.get("val").virtualType,
          virtualNetAddr: storage.get("val").virtualNetAddr,
          virtualPhyAddr: storage.get("val").virtualPhyAddr,
          bandwidth: storage.get("val").bandwidth,
          serviceIp: storage.get("val").serviceIp,
          serviceDesc: storage.get("val").serviceDesc,
          dateRange: [storage.get("val").serviceStartDate,storage.get("val").serviceEndDate]
        };
        this.setRoomData(json);

        if (storage.get("val").serviceId) {
          this.theServerEvt(this.roomData.userId);
          this.serverAction(this.roomData.userId, this.roomData.serviceId);
          this.$emit("activeServer");
          this.setServerRead(true);
          this.setServerRight(false);
        }
        this.userAction(this.roomData.userId);
        this.$emit("activeUser");
        this.setUserRead(true);
        //用户信息不可修改
        this.disable = true;
      }
    }
  },
  watch: {
    //当activeId=3。触发
    activeId: function() {
      if (this.activeId == 3) {
        if (this.serverData.setMode === 0) {
          this.isVirtual = true;
        }
        this.houseEvt();
        this.theServerEvt(this.roomData.userId);
      }
    }
  },
  computed: {
    ...mapState({
      isAdd: state => state.userManage.isAdd,
      isEdit: state => state.userManage.isEdit,
      userData: state => state.userManage.userData,
      serverData: state => state.userManage.serverData,
      roomData: state => state.userManage.roomData,
      userInputRead: state => state.userManage.userInputRead,
      serverInputShow: state => state.userManage.serverInputShow,
      serverRead: state => state.userManage.serverRead,
      activeId: state => state.userManage.activeId,
      step: state => state.userManage.step
    })
  },
  methods: {
    ipReg,
    ...mapActions([
      "setUserData",
      "setServerData",
      "setUserRead",
      "setServerRead",
      "setUserInputRead",
      "setRoomData",
      "setServerInputShow",
      "setServerRight"
    ]),
    getDetail(form) {
      // this.isLoading = true
      RoomDetail(form)
        .then(res => {
          if (res.status === "success") {
            this.setRoomData(res.message);
            this.roomData.dateRange = [
              res.message.serviceStartDate,
              res.message.serviceEndDate
            ];
          } else {
            this.$message({
              type: "error",
              message: res.message,
              showClose: true
            });
          }
          //  this.isLoading = false
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求不成功",
            showClose: true
          });
          //  this.isLoading = false
        });
    },
    userAction(val) {
      UserDetail({ userId: val })
        .then(res => {
          if (res.status === "success") {
            this.setUserData(res.message);
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
    serverAction(val1, val2) {
      var par = { userId: val1, serviceId: val2 };
      ServerDetail(par)
        .then(res => {
          if (res.status === "success") {
            this.setServerData(res.message);
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
    openForm(name) {
      storage.remove("rowData");
      this.addPerModal = true;
      storage.set("formTitle", name);
    },
    closePerForm() {
      this.addPerModal = false;
      if (storage.get("rowData")) {
        // console.log("123")
        this.roomData.userId = storage.get("rowData").userUnitName;
        this.userAction(storage.get("rowData").userUnitName); //请求用户
        this.$emit("activeUser"); //激活用户按钮
        this.setUserRead(true); //让用户只读

        //判断是否激活服务
        this.roomList = [];
        if (storage.get("rowData").userType == 1) {
          this.isServerShow = true;
          this.theServerEvt(this.roomData.userId);
          //让服务只读
          this.setServerRead(true);
          //服务右侧列表不显示
          this.setServerRight(false);
        } else {
          this.isServerShow = false;
          this.$emit("noActiveServer");
          //获取右侧的机房列表（不带服务的机房列表）
          this.getRoomList(this.serverData.userId);
        }
      }
    },
    //获取机房列表
    getRoomList(uId, sId) {
      this.listLoading = true;
      //参数
      var par = { userId: uId, serviceId: sId };
      getTakeUpRoomList(par)
        .then(res => {
          if (res.status === "success") {
            this.roomList = res.message.rows;
            //清空已填
            storage.set("user", this.roomData.userId);
            storage.set("server", this.roomData.serviceId);
            this.setRoomData({});
            this.roomData.userId = storage.get("user");
            this.roomData.serviceId = storage.get("server");
          } else {
            this.$message({
              type: "error",
              message: res.message,
              showClose: true
            });
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求不成功",
            showClose: true
          });
          this.listLoading = false;
        });
    },
    //选择服务下拉框
    serverEvt(val) {
      if (storage.get("rowData")) {
        this.serverAction(storage.get("rowData").name, this.roomData.serviceId);
        this.$emit("activeServer");
        //同时刷新右侧机房列表
        this.getRoomList(storage.get("rowData").name, this.roomData.serviceId);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.roomData.serviceStartDate =
            this.roomData.serviceStartDate ||
            fecha.format(this.roomData.dateRange[0], "YYYY-MM-DD");
          this.roomData.serviceEndDate =
            this.roomData.serviceEndDate ||
            fecha.format(this.roomData.dateRange[1], "YYYY-MM-DD");
          //保存机房信息，刷新右侧机房列表
          console.log(this.isAdd, this.isEdit, this.step, "11111111111");
          if (this.isAdd == true) {
            this.getDetail(this.roomData);
            this.getRoomList(this.roomData.userId, this.roomData.serviceId);
          } else if (this.isEdit == true) {
            this.getDetail(this.roomData);
            if (this.step != 3) {
              this.getRoomList(this.roomData.userId, this.roomData.serviceId);
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //退出
    returnEvt() {
      this.$emit("saveQuit");
    },
    preEvt() {
      if (this.roomData.userId) {
        if (this.isServerShow == true || this.serverInputShow == true) {
          //有用户的情况下看有没有服务
          if (this.roomData.serviceId) {
            this.$emit("preEvt");
            //  this.serverData.serviceContent = this.roomData.serviceId
            this.setUserInputRead(false);
          } else if (this.step == 1 || this.step == 2) {
            // console.log("我是从第一步来的")
            this.$emit("preEvt");
          } else {
            this.$message("请选择所属服务！");
          }
        } else {
          this.$emit("preEvtFist");
        }
      } else {
        this.$message("请先选择所属用户！");
      }
    },
    //修改机房
    editHandle(index, item) {
      this.activeNum = index;
      var par = { userId: item.userUnitId, houseCode: item.houseCode };
      RoomDetail(par)
        .then(res => {
          if (res.status === "success") {
            this.setRoomData(res.message);
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
    //删除机房
    delHandle(index, item) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //用户ID  deleteIds
          getTakeUpRoomDel()
            .then(res => {
              this.listLoading = false;
              this.$message({
                showClose: true,
                message: res.message,
                type: res.status == "success" ? "success" : "error"
              });
              if (res.status === "success") {
                this.getRoomList();
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "请求不成功",
                showClose: true
              });
              this.listLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //所有的下拉框
    //机房
    houseEvt() {
      houseList()
        .then(res => {
          if (res.status === "success") {
            this.roomLists = res.message;
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
    houseChange(item) {
      console.log(item);
      this.areaEvt(item);
    },
    //片区
    areaEvt(id) {
      houseAreaList({ serverId: id })
        .then(res => {
          if (res.status === "success") {
            this.houseAreaList = res.message;
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
    areaChange(item) {
      this.cabinetEvt(item);
    },
    //机架
    cabinetEvt(id) {
      cabinetIdList({ houseAreaId: id })
        .then(res => {
          if (res.status === "success") {
            this.cabinetIdList = res.message;
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
    //所属服务
    theServerEvt(id) {
      theServer({ userId: id })
        .then(res => {
          if (res.status === "success") {
            this.theServerList = res.message;
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
#roomItem {
  height: 100%;
  .form2 {
    width: 70%;
    height: 100%;
  }
  .form1 {
    width: 40%;
    height: 100%;
    float: left;
    padding-right: 20px;
    padding-left: 20px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .list {
    width: 60%;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .serverBox {
      float: left;
      width: 33.33%;
      padding-top: 10px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding-left: 15px;
      .wrapper {
        -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: 1px solid #ddd;
        background-color: #fff;
        padding: 10px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: #ececec;
          border-color: #67c23a;
        }
        &.active {
          background-color: #ececec;
          border: 2px solid #67c23a;
        }
        .operate {
          position: absolute;
          right: 2px;
          top: 0px;
        }
        .content {
          .label {
            width: 36px;
            text-align: right;
            color: #58666e;
          }
          .value {
            width: calc(100% - 36px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
