<template>
  <section id="userItem">
      <PanelHead :options="panelForm"></PanelHead>
      <br>
    <el-form :model="userData" :rules="addRule" ref="userData" label-width="180px">
      <el-form-item label="IDC/ISP许可证号：" prop="IDNumber">
        <el-select size="mini" v-model="userData.IDNumber" placeholder="请选择IDC/ISP许可证号" :disabled="userRead||disable">
          <el-option v-for="item in idcList" :key="item.idcNameList" :label="item.idcNameList" :value="item.idcNameList">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型：" prop="userType">
        <el-select size="mini" v-model="userData.userType" placeholder="请选择用户类型" @change="userTypeEvt" :disabled="userRead||disable">
          <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位名称：" prop="name">
        <el-input size="mini" v-model="userData.name" placeholder="单位名称" :disabled="userRead"></el-input>
      </el-form-item>
      <el-form-item label="单位属性：" prop="kindId">
        <el-select size="mini" v-model="userData.kindId" placeholder="请选择单位属性" :disabled="userRead">
          <el-option v-for="item in sxList" :key="item.kindId" :label="item.kindName" :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型：" prop="IDtype">
        <el-select size="mini" v-model="userData.IDtype" placeholder="请选择证件类型" :disabled="userRead">
          <el-option v-for="item in cardList" :key="item.idenTypeId" :label="item.idenTypeName" :value="item.idenTypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码：" prop="IDCode">
        <el-input size="mini" v-model="userData.IDCode" placeholder="证件号码" :disabled="userRead"></el-input>
      </el-form-item>
      <el-form-item label="网络信息安全责任人信息：" prop="officerId">
          <el-input size="mini" v-model="userData.officerId" @focus="openForm('网络信息安全责任人信息')" placeholder="网络信息安全责任人信息" :disabled="userRead">
              <el-button slot="append" @click="openForm('网络信息安全责任人信息')" :disabled="userRead">选择</el-button>
          </el-input>
      </el-form-item>
      <el-form-item label="邮政编码：" prop="postalCode">
        <el-input size="mini" v-model="userData.postalCode" placeholder="邮政编码" :disabled="userRead"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：" prop="registerTime">
          <el-date-picker size="mini"  :disabled="userRead"
              v-model="userData.registerTime"
              type="date"
              placeholder="注册时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="单位地址：" prop="addr">
        <el-input size="mini" v-model="userData.addr" placeholder="单位地址" :disabled="userRead"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input size="mini" v-model="userData.remark" placeholder="备注" :disabled="userRead"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button-group>
          <el-button type="primary" @click="submitForm('userData')">确定</el-button>
          <el-button type="primary" @click="nextEvt('userData')">下一步</el-button>
            <el-button type="primary" @click="returnEvt">退出</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <add-save v-if="addSaveModal" @cancelClick="closePerForm"></add-save>
  </section>
</template>

<script>
import AddSave from "./saver.vue";
import storage from "utils/storage";
import { mapActions, mapState } from "vuex";
import { UserDetail, comList, cardList, idcList } from "api/dxq/UserManage";
import PanelHead from "components/Common/PanelHead";
import fecha from "fecha";
import { postalCode } from "constants/reg";
export default {
  name: "Add",
  components: { AddSave, PanelHead },
  data() {
    return {
      disable: false,
      addSaveModal: false,
      addRule: {
        name: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        IDNumber: [
          {
            required: true,
            message: "请选择IDC/ISP许可证号",
            trigger: "change"
          }
        ],
        kindId: [
          { required: true, message: "请选择单位属性", trigger: "change" }
        ],
        IDtype: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        IDCode: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        officerId: [
          {
            required: true,
            message: "请输入网络安全责任人信息",
            trigger: "change"
          }
        ],
        postalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          {
            message: "请输入正确的邮政编码",
            pattern: postalCode,
            trigger: "blur"
          }
        ],
        registerTime: [
          { required: true, message: "请输入注册时间", trigger: "blur" }
        ],
        addr: [{ required: true, message: "请输入单位地址", trigger: "blur" }]
      },
      idcList: [],
      userList: [
        { value: 1, label: "提供应用服务的用户" },
        { value: 2, label: "其它用户" }
      ],
      sxList: [],
      cardList: [],
      panelForm: { title: "用户信息" }
    };
  },
  created() {
    // console.log(this.activeId)
    if (this.activeId == 1) {
      this.selectEvt();
      if (this.isAdd == true) {
        this.panelForm = { title: "新增用户" };
        this.setUserRead(false); //初始化进来清空只读属性
      } else if (this.isEdit == true) {
        this.panelForm = { title: "修改用户" };
        this.setUserRead(false);
        var json = {
          IDNumber: storage.get("user").IDNumber,
          userType: storage.get("user").userType,
          name: storage.get("user").name,
          kindId: storage.get("user").kindId,
          IDtype: storage.get("user").IDtype,
          IDCode: storage.get("user").IDCode,
          addr: storage.get("user").addr,
          officerId: storage.get("user").officerId,
          postalCode: storage.get("user").postalCode,
          registerTime: storage.get("user").registerTime,
          remark: storage.get("user").remark
        };
        this.setUserData(json);
        //许可证号及用户类型不可更改
        this.disable = true;
      }
    }
  },
  computed: {
    ...mapState({
      isAdd: state => state.userManage.isAdd,
      isEdit: state => state.userManage.isEdit,
      userData: state => state.userManage.userData,
      userRead: state => state.userManage.userRead,
      serverData: state => state.userManage.serverData,
      roomData: state => state.userManage.roomData,
      activeId: state => state.userManage.activeId,
      step: state => state.userManage.step
    })
  },
  methods: {
    postalCode,
    ...mapActions([
      "setServerData",
      "setUserRead",
      "setUserInputRead",
      "setServerRead",
      "setUserData",
      "setRoomData",
      "setServerInputShow",
      "setServerRight"
    ]),
    getDetail(form) {
      UserDetail(form)
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
    userTypeEvt(val) {
      if (val == 1) {
        //带服务
        this.$emit("ServerEvt");
      } else {
        //不带服务
        this.$emit("noServerEvt");
      }
    },
    nextEvt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断是否有服务
          if (this.userData.userType == 1) {
            if (this.step == 1) {
              //如果一开始就是第一步
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
              this.serverData.userId = this.userData.name;
              this.setUserInputRead(true);
              this.$emit("activeServer");
              this.setServerRight(true);
              this.setServerRead(false);
              // console.log("111111111111")
              //发送保存请求
              if (this.userData.registerTime.toString().indexOf("GMT") > -1) {
                this.userData.registerTime = fecha.format(
                  this.userData.registerTime,
                  "YYYY-MM-DD"
                );
              }
              this.getDetail(this.userData);
              this.disable = true;
            } else if (this.step == 2) {
              this.$emit("activeServer");
            } else if (this.step == 3) {
              this.setServerRead(true);
              this.$emit("activeServer");
            }
          } else {
            if (this.step == 3) {
              // console.log("修改");
              this.$emit("activeRoom");
            } else {
              // console.log("新增");
              if (this.userData.registerTime.toString().indexOf("GMT") > -1) {
                this.userData.registerTime = fecha.format(
                  this.userData.registerTime,
                  "YYYY-MM-DD"
                );
              }
              this.getDetail(this.userData);
              this.disable = true;
              this.setRoomData({});
              this.$emit("activeRoom");
              this.roomData.userId = this.userData.name;
              this.setUserInputRead(true);
              this.setServerInputShow(false);
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.userData.registerTime.toString().indexOf("GMT") > -1) {
            this.userData.registerTime = fecha.format(
              this.userData.registerTime,
              "YYYY-MM-DD"
            );
          }
          this.getDetail(this.userData);
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
    openForm(name) {
      storage.remove("rowData");
      this.addSaveModal = true;
      storage.set("formTitle", name);
    },
    closePerForm() {
      this.addSaveModal = false;
      if (storage.get("rowData")) {
        this.userData.officerId = storage.get("rowData").name;
      }
    },
    //下拉框  单位属性   //证件类型    //许可证号下拉
    selectEvt() {
      comList()
        .then(res => {
          if (res.status === "success") {
            this.sxList = res.message;
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
      cardList()
        .then(res => {
          if (res.status === "success") {
            this.cardList = res.message;
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
      idcList()
        .then(res => {
          if (res.status === "success") {
            this.idcList = res.message;
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
#userItem {
  height: 100%;
  width: 70%;
}
</style>
