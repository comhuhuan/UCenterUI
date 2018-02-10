<template>
    <section id="serverItem">
        <div :class="{'form1':serverEdit==true,'form2':serverEdit==false}">
            <PanelHead :options="panelForm"></PanelHead>
            <br>
            <el-form :model="serverData" :rules="addRule" ref="serverData" label-width="180px">
                <el-form-item label="互联网应用服务的用户信息：" prop="userId">
                    <el-input size="mini" v-model="serverData.userId" placeholder="互联网应用服务的用户信息" :disabled="userInputRead||serverRead||disable">
                        <el-button slot="append" @click="openForm('互联网应用服务的用户信息')" :disabled="userInputRead||serverRead||disable">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="服务内容：" prop="serviceContent">
                    <el-select size="mini" multiple collapse-tags  v-model="serverData.serviceContent" placeholder="请选择所属服务" :disabled="serverRead">
                        <el-option-group
                            v-for="group in serviceList"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="网站备案类型：">
                    <el-select size="mini" v-model="serverData.regType" placeholder="请选择网站备案类型" :disabled="serverRead">
                        <el-option v-for="item in webList" :key="item.regTypeName" :label="item.regTypeName" :value="item.regType">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网站备案号或许可证号：">
                    <el-input size="mini" v-model="serverData.regId" placeholder="网站备案号或许可证号" :disabled="serverRead"></el-input>
                </el-form-item>
                <el-form-item label="接入方式：">
                    <el-select size="mini" v-model="serverData.setMode" placeholder="请选择接入方式" :disabled="serverRead||disable">
                        <el-option v-for="item in accessList" :key="item.ethernetId" :label="item.ethernetName" :value="item.ethernetId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型：">
                    <el-select size="mini" v-model="serverData.busType" placeholder="请选择业务类型" :disabled="serverRead">
                        <el-option v-for="item in businessList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-for="(domain, index) in serverData.domain" :label="'域名' + index + '：'" :key="domain.key">
                    <el-input size="mini" v-model="domain.value" :disabled="serverRead">
                        <el-button slot="append" icon="el-icon-error" @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button size="mini" type="success" round icon="el-icon-puls" @click="addDomain">新增一行</el-button>
                </el-form-item>
                <el-form-item label="">
                    <el-button-group>
                        <el-button type="primary" @click="submitForm('serverData')">确定</el-button>
                        <el-button type="primary" @click="preEvt">上一步</el-button>
                        <el-button type="primary" @click="nextEvt('serverData')">下一步</el-button>
                        <el-button type="primary" @click="returnEvt">退出</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="list" v-loading="listLoading" v-show="serverEdit">
            <PanelHead :options="panelOpt"></PanelHead>
            <div class="serverBox" v-for="(item,index) in serverList" :key="item.id" >
                <div class="wrapper" @click="editHandle(index, item)" :class="{'active':index==activeNum}">
                    <div class="operate">
                        <span title="编辑" class="icon iconfont icon-xiugai1" @click="editHandle(index, item)"></span>
                        <span title="删除" class="icon iconfont icon-shanchu" @click="delHandle(index, item)"></span>
                    </div>
                    <div class="content">
                        <ul>
                            <li :title="item.cabId"><span class="label">所属用户：</span><span class="value">{{item.userUnitId}}</span></li>
                            <li :title="item.cabId"><span class="label">服务内容：</span><span class="value">{{item.serviceContent}}</span></li>
                            <li :title="item.cabId"><span class="label">接入方式：</span><span class="value">{{item.setMode}}</span></li>
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
  ServerDetail,
  baList,
  modeList,
  UserDetail,
  getApplyServerManageList,
  getApplyServerManageDel
} from "api/dxq/UserManage";
import PanelHead from "components/Common/PanelHead";
export default {
  name: "Add",
  components: { AddPerson, PanelHead },
  data() {
    return {
      activeNum: "",
      disable: false,
      addPerModal: false,
      serviceList: [
        {
          label: "基础应用",
          options: [
            { value: "0", label: "即时通讯" },
            { value: "1", label: "搜索引擎" },
            { value: "2", label: "综合门户" },
            { value: "3", label: "网上邮局" }
          ]
        },
        {
          label: "网络媒体",
          options: [
            { value: "4", label: "网络新闻" },
            { value: "5", label: "博客/个人空间" },
            { value: "6", label: "网络广告/信息" },
            { value: "7", label: "单位门户网站" }
          ]
        }
      ],
      businessList: [
        { value: 1, label: "IDC业务" },
        { value: 2, label: "ISP业务" }
      ],
      accessList: [],
      webList: [],
      addRule: {
        userId: [
          {
            required: true,
            message: "请选择互联网应用服务的用户信息",
            trigger: "change"
          }
        ],
        serviceContent: [
          { required: true, message: "请选择服务内容", trigger: "change" }
        ]
      },
      serverList: [],
      panelOpt: { title: "服务列表" },
      panelForm: { title: "服务信息" },
      listLoading: false
    };
  },
  created() {
    if (this.activeId == 2) {
      this.selectEvt();
      if (this.isAdd == true) {
        this.setServerRead(false); //初始化进来清空只读属性
        this.setUserInputRead(false);
        this.setServerRight(true);
        this.panelForm = { title: "新增服务" };
      } else if (this.isEdit == true) {
        this.panelForm = { title: "修改服务" };
        //去掉右侧服务列表
        this.setServerRight(false);
        this.setServerRead(false);

        var json = {
          userId: storage.get("server").userId,
          serviceContent: storage.get("server").serviceContent,
          regType: storage.get("server").regType,
          regId: storage.get("server").regId,
          setMode: storage.get("server").setMode,
          busType: storage.get("server").busType,
          domain: storage.get("server").domain
        };
        this.setServerData(json);

        //请求用户
        this.userAction(this.serverData.userId);
        this.$emit("activeUser");
        this.setUserRead(true);

        //用户信息，接入方式不可修改
        this.disable = true;
        this.setServerRight(false);
      }
    }
  },
  mounted() {},
  watch: {
    //当activeId=2。触发
    activeId: function() {
      if (this.activeId == 2 && this.step != 3) {
        this.selectEvt();
      }
    }
  },
  computed: {
    ...mapState({
      isAdd: state => state.userManage.isAdd,
      isEdit: state => state.userManage.isEdit,
      userData: state => state.userManage.userData,
      serverData: state => state.userManage.serverData,
      serverRead: state => state.userManage.serverRead,
      userInputRead: state => state.userManage.userInputRead,
      roomData: state => state.userManage.roomData,
      activeId: state => state.userManage.activeId,
      step: state => state.userManage.step,
      serverEdit: state => state.userManage.serverEdit
    })
  },
  methods: {
    ...mapActions([
      "setUserData",
      "setUserRead",
      "setServerRead",
      "setUserInputRead",
      "setServerData",
      "setRoomData",
      "setServerInputShow",
      "setServerRight"
    ]),
    getServerList(id) {
      //获取某个用户下面的服务列表  //传参
      this.listLoading = true;
      var par = { userId: id };
      getApplyServerManageList(par)
        .then(res => {
          if (res.status === "success") {
            this.serverList = res.message.rows;

            //清空已填
            storage.set("user", this.serverData.userId);
            this.setServerData({
              userId: "",
              serviceContent: [],
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
            this.serverData.userId = storage.get("user");
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
    getDetail(form) {
      // this.isLoading = true
      ServerDetail(form)
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
    //上一步
    preEvt() {
      if (this.serverData.userId) {
        this.$emit("preEvt");
      } else {
        this.$message("请先选择用户");
      }
    },
    //确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //保存服务信息，刷新右侧服务列表
          console.log(this.isAdd, this.isEdit, this.step, "1111111");
          if (this.isAdd == true) {
            this.getDetail(this.serverData);
            this.getServerList(this.serverData.userId);
          } else if (this.isEdit == true) {
            this.getDetail(this.serverData);
            if (this.step != 2) {
              this.getServerList(this.serverData.userId);
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下一步
    nextEvt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.step == 3) {
            this.$emit("nextEvt");
          } else {
            if (this.isAdd == true) {
              this.getServerList(this.serverData.userId);
            }
            //保存服务信息，刷新右侧服务列表
            this.getDetail(this.serverData);
            this.$emit("nextEvt");
            this.setRoomData({});
            this.roomData.userId = this.userData.name;
            this.setUserInputRead(true);
            this.setServerInputShow(true);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增一行
    addDomain() {
      this.serverData.domain.push({
        value: "",
        key: Date.now()
      });
    },
    //删除
    removeDomain(item) {
      var index = this.serverData.domain.indexOf(item);
      // console.log(index)
      if (index > -1 && index !== 0) {
        this.serverData.domain.splice(index, 1);
      }
    },
    //退出
    returnEvt() {
      this.$emit("saveQuit");
    },
    openForm(name) {
      storage.remove("rowData");
      this.addPerModal = true;
      storage.set("formTitle", name);
    },
    closePerForm() {
      this.addPerModal = false;
      if (storage.get("rowData")) {
        this.serverData.userId = storage.get("rowData").userUnitName;
        //激活用户按钮
        //请求用户
        this.userAction(storage.get("rowData").userUnitName);
        this.$emit("activeUser");
        //让用户只读
        this.setUserRead(true);
        //获取右侧的服务列表
        this.getServerList(this.serverData.userId);
      }
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
    //修改服务
    editHandle(index, item) {
      this.activeNum = index;
      var par = { userId: item.userUnitId, serviceId: item.serviceId };
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
          //  this.isLoading = false
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求不成功",
            showClose: true
          });
        });
    },
    //删除服务
    delHandle(index, item) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //用户ID  deleteIds
          var par = { deleteIds: item.serviceId };
          getApplyServerManageDel(par)
            .then(res => {
              this.listLoading = false;
              this.$message({
                showClose: true,
                message: res.message,
                type: res.status == "success" ? "success" : "error"
              });
              if (res.status === "success") {
                this.getServerList();
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
    //网站备案类型   //接入方式
    selectEvt() {
      baList()
        .then(res => {
          if (res.status === "success") {
            this.webList = res.message;
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
    }
  }
};
</script>

<style lang="less">
#serverItem {
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
          border: 1px solid #67c23a;
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
